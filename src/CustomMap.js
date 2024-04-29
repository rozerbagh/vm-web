import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import Messages from "./components/Messages";
// import GoogleMap from "./components/GoogleMap";
mapboxgl.accessToken =
  "pk.eyJ1IjoidmlkeWFtYXJnYW0iLCJhIjoiY2xyeThkM2xlMWk4azJqdGVkdDlwNnE4cSJ9.gsl8JUFq7_8bfZEHpnZ0jA";
export default function CustomMap() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [isPermission, setIsPermission] = useState(false);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  const handleLocarionPermission = () => {
    try {
      navigator.geolocation.getCurrentPosition(
        (res) => {
          console.log(res);
          setLng(res.coords.longitude);
          setLat(res.coords.latitude);
          setIsPermission(true);
        },
        (error) => {
          console.log(error);
          setIsPermission(false);
        },
        { enableHighAccuracy: true }
      );
    } catch (error) {
      setIsPermission(false);
    }
  };

  const handleMouseMove = (e, map) => {
    if (map.current) {
      map.current?.on("move", () => {
        console.log(map.current);
        setLng(map.current?.getCenter().lng.toFixed(4));
        setLat(map.current?.getCenter().lat.toFixed(4));
        setZoom(map.current?.getZoom().toFixed(2));
      });
    }
  };

  useEffect(() => {
    handleLocarionPermission();
  }, []);
  useEffect(() => {
    if (isPermission) {
      if (map.current) {
        setLng(map.current?.getCenter().lng.toFixed(4));
        setLat(map.current?.getCenter().lat.toFixed(4));
        setZoom(map.current?.getZoom().toFixed(2));
        return; // initialize map only once
      } else {
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/streets-v12",
          center: [lng, lat],
          zoom: zoom,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lng, lat, map, isPermission]);
  return (
    <>
      {/* <GoogleMap/> */}
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div
        ref={mapContainer}
        className="map-container"
        onMouseMove={(e) => handleMouseMove(e, map)}
      ></div>
      <Messages latitude={lat} longitude={lng} />
    </>
  );
}
