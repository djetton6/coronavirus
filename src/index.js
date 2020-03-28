import { GoogleMapsOverlay } from "@deck.gl/google-maps";
import { HexagonLayer } from "@deck.gl/aggregation-layers";
import { ScatterplotLayer } from "@deck.gl/layers";
import { HeatmapLayer } from "@deck.gl/aggregation-layers";

import mapStyles from "./map-styles";
const sourceData = "./covid19.json";

const scatterplot = () =>
  new ScatterplotLayer({
    id: "scatter",
    data: sourceData,
    opacity: 0.8,
    filled: true,
    radiusMinPixels: 10,
    radiusMaxPixels: 70,
    getPosition: d => [d.longitude, d.latitude],
    getFillColor: d => (d.confirmed > 0 ? [0, 128, 128] : [255, 140, 0, 100]),
    getStrokeColor: d =>
      d.recovered > d.deceased ? [80, 200, 120] : [0, 128, 128],
    pickable: true
  });

const heatmap = () =>
  new HeatmapLayer({
    id: "heat",
    data: sourceData,
    getPosition: d => [d.longitude, d.latitude],
    getWeight: d => d.confirmed + d.deceased * 0.5,
    radiusPixels: 20
  });

window.initMap = () => {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 40.0, lng: -100.0 },
    zoom: 3,
    styles: mapStyles
  });

  const overlay = new GoogleMapsOverlay({
    layers: [scatterplot(), heatmap()]
  });

  overlay.setMap(map);

  // overlay.setProps({ layers: [] });
};
