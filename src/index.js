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
    getPosition: (d) => [d.longitude, d.latitude],
    getFillColor: (d) => (d.confirmed > 0 ? [0, 128, 128] : [255, 140, 0, 100]),
    getStrokeColor: (d) =>
      d.recovered > d.deceased ? [80, 200, 120] : [0, 128, 128],
    pickable: true,

    // onHover: ({object, confirmed, recovered}) => {
    //   const element = document.getElementById('tooltip');
    //   if (object) {
    //     const { d.confirmed, d.recovered}) = object;
    //     element.innerHTML = `<h1>${d.country}</h1>`
    //     element.style.display = 'block';
    //     element.style.opacity = 0.9;
    //     element.style.left = x + 'px';
    //     element.style.top = y + 'px';
    //   },

    // onClick: ({object, x, y}) => {
    //   window.open('https://www.cnn.com/2020/04/04/health/recovery-coronavirus-tracking-data-explainer/index.html')
    // },
  });

const heatmap = () =>
  new HeatmapLayer({
    id: "heat",
    data: sourceData,
    getPosition: (d) => [d.longitude, d.latitude],
    getWeight: (d) => d.confirmed + d.deceased * 0.5,
    radiusPixels: 30,
  });

const hexagon = () =>
  new HexagonLayer({
    id: "hex",
    data: sourceData,
    getPosition: (d) => [d.longitude, d.latitude],
    getElevationWeight: (d) => d.confirmed * 2 + d.recovered,
    elevationScale: 10000,
    extruded: true,
    radius: 200,
    opacity: 0.6,
    coverage: 200,
    lowerPercentile: 50,
  });

window.initMap = () => {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 40.0, lng: -100.0 },
    zoom: 5,
    styles: mapStyles,
  });

  const overlay = new GoogleMapsOverlay({
    layers: [scatterplot(), heatmap(), hexagon()],
  });

  overlay.setMap(map);

  // overlay.setProps({ layers: [] });
};
