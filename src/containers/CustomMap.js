/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { MapContext } from "../contexts/MapContext";
import Loader from "../components/Loader";
import SerachBox from "../components/MapComponents/SerachBox";
import marker from "../img/location-pin-svgrepo-com.svg";
// import GoogleMap from "../components/MapComponents/GoogleMap";
mapboxgl.accessToken =
  "pk.eyJ1IjoidmlkeWFtYXJnYW0iLCJhIjoiY2xyeThkM2xlMWk4azJqdGVkdDlwNnE4cSJ9.gsl8JUFq7_8bfZEHpnZ0jA";
export default function CustomMap() {
  const {
    mapContainer,
    map,
    isPermission,
    setIsPermission,
    lng,
    setLng,
    lat,
    setLat,
    zoom,
    setZoom,
    handleFetchNavigation,
  } = useContext(MapContext);
  

  const handlePermission = () => {
    try {
      navigator.geolocation.watchPosition(
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
        setLng(map.current?.getCenter().lng.toFixed(4));
        setLat(map.current?.getCenter().lat.toFixed(4));
        setZoom(map.current?.getZoom().toFixed(2));
      });
    }
  };

  useEffect(() => {
    handlePermission();
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
        const popup = new mapboxgl.Popup({ offset: 25 }).setText("Marker");
        // create DOM element for the marker
        const el = document.createElement("div");
        el.id = "marker";
        el.className = "marker"
        new mapboxgl.Marker(
          (
            <div id="marker">
              <img src={marker} alt="marker" />
            </div>
          )
        )
          .setLngLat([lng, lat])
          .setPopup(popup) // sets a popup on this marker
          .addTo(map.current);
      }
    }
  }, [lng, lat, map, isPermission]);
  const handleRoute = async () => {
    try {
      const data = await handleFetchNavigation([
        [lng, lat],
        [83.976151, 21.470539],
      ]);
      if (data !== null) {
        const route = data.routes[0].geometry.coordinates;
        const geojson = {
          type: "Feature",
          properties: {},
          geometry: {
            type: data.routes[0].geometry.type,
            coordinates: route,
          },
        };

        if (map.current.getSource("route")) {
          map.current.getSource("route").setData(geojson);
        } else {
          map.current.addLayer({
            id: "route",
            type: "line",
            source: {
              type: "geojson",
              data: geojson,
            },
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": "#3887be",
              "line-width": 5,
              "line-opacity": 0.75,
            },
          });
        }
      }


    } catch (error) {
      console.log(error)
    }
  };
  return lat && lng ? (
    <>
      <SerachBox handleRoute={handleRoute} />
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div
        ref={mapContainer}
        className="map-container"
        onMouseMove={(e) => handleMouseMove(e, map)}
      ></div>
    </>
  ) : (
    <Loader />
  );
}
