import React, { useEffect, useState } from "react";
import "cesium/Build/Cesium/Widgets/widgets.css";
import * as Cesium from "cesium";

function POC() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [viewer, setViewer] = useState(null);
  const [dataSource, setDataSource] = useState(null);

  const getCurrentLocation = () => {
    if (viewer) {
      const cameraPositionCartographic = viewer.camera.positionCartographic;
      if (cameraPositionCartographic) {
        const longitude = Cesium.Math.toDegrees(
          cameraPositionCartographic.longitude
        );
        const latitude = Cesium.Math.toDegrees(
          cameraPositionCartographic.latitude
        );
        const altitude = cameraPositionCartographic.height;
        setCurrentLocation({ longitude, latitude, altitude });
        viewer.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(
            longitude,
            latitude,
            300000
          ),
        });
        fetchGeoJSON(longitude, latitude);
      }
    }
  };

  useEffect(() => {
    const viewer = new Cesium.Viewer("cesiumContainer");
    setViewer(viewer);

    return () => {
      viewer.destroy();
    };
  }, []);

  const fetchGeoJSON = async (longitude, latitude) => {
    if (!viewer) return;

    if (dataSource) {
      viewer?.dataSources?.remove(dataSource);
    }

    const url = `http://localhost:3001/geojson?longitude=${longitude}&latitude=${latitude}`;
    const response = await fetch(url);
    const geojsonData = await response.json();
    console.log(geojsonData);
    const newDataSource = await Cesium.GeoJsonDataSource.load(geojsonData, {
      clampToGround: true,
    });

    setDataSource(newDataSource);
    viewer.dataSources.add(newDataSource);
  };

  return (
    <div>
      <div
        id="cesiumContainer"
        style={{
          width: "100%",
          height: "500px",
          marginBottom: "1rem",
        }}
      />
      <button style={{ marginLeft: "1rem" }} onClick={getCurrentLocation}>
        Get Current Location
      </button>
      {currentLocation && (
        <div style={{ marginLeft: "1rem" }}>
          <h2>Current Location:</h2>
          <p>Longitude: {currentLocation.longitude}</p>
          <p>Latitude: {currentLocation.latitude}</p>
          <p>Altitude: {currentLocation.altitude} meters</p>
        </div>
      )}
    </div>
  );
}

export default POC;
