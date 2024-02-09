const express = require("express");
const fs = require("fs");
const turf = require("@turf/turf");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/geojson", (req, res) => {
  // const metadataFilePath =
  //   "/Users/yogeshchandrasekar/Downloads/geonames-all-cities-with-a-population-500.geojson";
  const metadataFilePath = "/Users/yogeshchandrasekar/Downloads/example.json";

  const geojsonData = JSON.parse(fs.readFileSync(metadataFilePath));

  // Latitude and longitude of the point to filter around
  const latitude = req.query.latitude;
  const longitude = req.query.longitude;

  // Radius in meters for the filtering
  const radiusInMeters = 100;

  const point = turf.point([longitude, latitude]);

  const filteredFeatures = geojsonData.features.filter((feature) => {
    if (feature.geometry.type === "Polygon") {
      // Convert nested arrays coordinates to GeoJSON Polygon
      const polygonCoords = feature.geometry.coordinates[0].map((coord) => [
        parseFloat(coord[0]),
        parseFloat(coord[1]),
      ]);
      const polygon = turf.polygon([polygonCoords]);

      return polygon;
    } else if (feature.geometry.type === "MultiPolygon") {
      // Convert nested arrays coordinates to GeoJSON Polygon
      const polygonCoords = feature.geometry.coordinates[0].map((coord) => [
        parseFloat(coord[0]),
        parseFloat(coord[1]),
      ]);
      const polygon = turf.multiPolygon([polygonCoords]);

      return polygon;
    } else if (feature.geometry.type === "Point") {
      // Convert nested arrays coordinates to GeoJSON Point
      // const featurePoint = turf.point([
      //   parseFloat(feature.geometry.coordinates[0]),
      //   parseFloat(feature.geometry.coordinates[1]),
      // ]);
      // const distance = turf.distance(point, featurePoint);
      // console.log(distance);
      // return distance <= radiusInMeters;
      const distance = turf.distance(point, feature);
      console.log(distance);
      return distance <= radiusInMeters;
    } else {
      const lineCoords = feature.geometry.coordinates.map((coord) => [
        parseFloat(coord[0]),
        parseFloat(coord[1]),
      ]);
      const lineString = turf.lineString(lineCoords);
      const distance = turf.pointToLineDistance(point, lineString);
      return distance <= radiusInMeters;
    }
  });

  const filteredGeoJSON = {
    type: "FeatureCollection",
    features: filteredFeatures,
  };

  res.json(filteredGeoJSON);
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
