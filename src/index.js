import { GoogleMapsOverlay } from "@deck.gl/google-maps";
import { HexagonLayer } from "@deck.gl/aggregation-layers";
import { ScatterplotLayer } from "@deck.gl/layers";
import { HeatmapLayer } from "@deck.gl/aggregation-layers";

const sourceData = "./covid19.json";

const scatterplot = () =>
  new ScatterplotLayer({
    id: "scatter",
    data: "sourceData",
    opacity: 0.8,
    filled: true,
    radiusMinPixels: 2,
    radiusMaxPixels: 5,
    getPosition: d => [d.longitude, d.latitude],
    getFillColor: d =>
      d.deceased > 0 ? [200, 0, 40, 150] : [255, 140, 0, 100],
    pickable: true
  });

const heatmap = () =>
  new HeatmapLayer({
    id: "heat",
    data: sourceData,
    getPosition: d => [d.longitude, d.Latitude],
    getWeight: d => d.n_Deceased + d.n_Confirmed * 0.5,
    radiusPixels: 60
  });

window.initMap = () => {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 40.0, lng: -100.0 },
    zoom: 5
  });

  const overlay = new GoogleMapsOverlay({
    layers: [scatterplot()]
  });

  overlay.setMap(map);

  overlay.setProps({ layers: [] });
};
