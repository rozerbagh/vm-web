import React, { createContext } from "react";
import useMap from "../hooks/useMap";
import {map_access_token} from "../utils/axiosInstance"
export const MapContext = createContext({
  handleFetchNavigation: undefined,
  loadingNavigation: undefined,
  setLoadingNavigation: undefined,
  mapNavigation: undefined,
  setMapNavigation: undefined,
  mapContainer: undefined,
  map: undefined,
  isPermission: undefined,
  setIsPermission: undefined,
  lng: undefined,
  setLng: undefined,
  lat: undefined,
  setLat: undefined,
  zoom: undefined,
  setZoom: undefined,
});

export default function MapContextProvider({ children }) {
  const state = useMap({ map_access_token });
  return (
    <MapContext.Provider value={state}>
      {children}
    </MapContext.Provider>
  );
}
