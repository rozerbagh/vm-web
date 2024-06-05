import { useState, useRef } from "react";
import { mapAxios } from "../utils/axiosInstance";
function useMap({ map_access_token }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [isPermission, setIsPermission] = useState(false);
  const [lng, setLng] = useState(null);
  const [lat, setLat] = useState(null);
  const [zoom, setZoom] = useState(15);
  const [loadingNavigation, setLoadingNavigation] = useState(false);
  const [mapNavigation, setMapNavigation] = useState(null);
  const handleFetchNavigation = async (latLongsArray) => {
    const latlongs = latLongsArray.join(";");
    const fetchURL = `/driving/${latlongs}?alternatives=true&geometries=geojson&language=en&overview=full&steps=true&access_token=${map_access_token}`;
    try {
      const { data } = await mapAxios.get(fetchURL);
      return data;
    } catch (error) {
      return null;
    }
  };
  return {
    handleFetchNavigation,
    loadingNavigation,
    setLoadingNavigation,
    mapNavigation,
    setMapNavigation,
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
  };
}

export default useMap;
