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
    opacity: 0.9,
    filled: true,
    radiusMinPixels: 2,
    radiusMaxPixels: 5,
    getPosition: (d) => [d.longitude, d.latitude],
    getFillColor: (d) =>
      d.deceased > 0 ? [200, 0, 40, 150] : [255, 140, 0, 100],

    pickable: true,
    onHover: ({ object, x, y }) => {
      const el = document.getElementById("tooltip");
      if (object) {
        const { confirmed, country } = object;
        el.innerHTML = `<h1>Location: ${country}</h1>
      `;
        el.style.display = "block";
        el.style.opacity = 0.9;
        el.style.left = x + "px";
        el.style.top = y + "px";
      } else {
        el.style.display = "none";
        el.style.opacity = 0.0;
      }
    },
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

// import { GoogleMapsOverlay } from "@deck.gl/google-maps";
// import { HexagonLayer } from "@deck.gl/aggregation-layers";
// import { ScatterplotLayer } from "@deck.gl/layers";
// import { HeatmapLayer } from "@deck.gl/aggregation-layers";
// import mapStyles from "./map-styles";

// const sourceData = "./covid19.json";

// const scatterplot = () =>
//   new ScatterplotLayer({
//     id: "scatter",
//     data: sourceData,
//     opacity: 0.9,
//     filled: true,
//     radiusMinPixels: 2,
//     radiusMaxPixels: 5,
//     getPosition: (d) => [d.longitude, d.latitude],
//     getFillColor: (d) =>
//       d.deceased > 0 ? [200, 0, 40, 150] : [255, 140, 0, 100],

//     pickable: true,
//     onHover: ({ object, x, y }) => {
//       const el = document.getElementById("tooltip");
//       if (object) {
//         const { confirmed, country } = object;
//         el.innerHTML = `<h1>Location: ${country}</h1>`;
//         el.style.display = "block";
//         el.style.opacity = 0.9;
//         el.style.left = x + "px";
//         el.style.top = y + "px";
//       } else {
//         el.style.opacity = 0.0;
//       }
//     },

//     onClick: ({ object, x, y }) => {
//       window.open(
//         `https://www.gunviolencearchive.org/incident/${object.incident_id}`
//       );
//     },
//   });

// const heatmap = () =>
//   new HeatmapLayer({
//     id: "heat",
//     data: sourceData,
//     getPosition: (d) => [d.longitude, d.latitude],
//     getWeight: (d) => d.deceased + d.confirmed * 0.5,
//     radiusPixels: 100,
//   });

// const hexagon = () =>
//   new HexagonLayer({
//     id: "hex",
//     data: sourceData,
//     getPosition: (d) => [d.longitude, d.latitude],
//     getElevationWeight: (d) => d.deceased * 2 + d.confirmed,
//     elevationScale: 100,
//     extruded: true,
//     radius: 1609,
//     opacity: 0.6,
//     coverage: 0.88,
//     lowerPercentile: 50,
//   });

// window.initMap = () => {
//   const map = new google.maps.Map(document.getElementById("map"), {
//     center: { lat: 40.0, lng: -100.0 },
//     zoom: 5,
//     styles: mapStyles,
//   });

//   const overlay = new GoogleMapsOverlay({
//     layers: [scatterplot(), heatmap(), hexagon()],
//   });

//   overlay.setMap(map);
// };
