import React, { createContext } from "react";
import useAuth from "../hooks/useAuth"

export const AppContext = createContext({
  userDetails: undefined
});

export default function BroadcastProvider({ children, token }) {
  const {userDetails} = useAuth();
  
  return (
    <AppContext.Provider value={{ userDetails }}>
      {children}
    </AppContext.Provider>
  );
}
