import React, { createContext } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth"

export const AppContext = createContext({
  userDetails: undefined,
  setUserDetails: undefined,
  axios: axios
});

export default function AppContextProvider({ children }) {
  const { userDetails, setUserDetails } = useAuth();
  return (
    <AppContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </AppContext.Provider>
  );
}
