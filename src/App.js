/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { AppContext } from "./contexts/AppContext";
import "./App.css";
import CustomMap from "./containers/CustomMap";
import LoginPage from "./containers/Login";
import Messages from "./components/Messages";
import Pricing from "./containers/Pricing";
// import GoogleMap from "./components/GoogleMap";
mapboxgl.accessToken =
  "pk.eyJ1IjoidmlkeWFtYXJnYW0iLCJhIjoiY2xyeThkM2xlMWk4azJqdGVkdDlwNnE4cSJ9.gsl8JUFq7_8bfZEHpnZ0jA";

function App() {
  const { setUserDetails } = useContext(AppContext);
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    const userd = JSON.parse(localStorage.getItem("userDetails"));
    if (userd?.token) {
      setUserDetails(userd);
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, []);

  return window.location.pathname.includes("price") ? (
    <Pricing />
  ) : (
    <>
      {isAuth ? (
        <>
          <Messages />
          <CustomMap />
        </>
      ) : (
        <LoginPage />
      )}
    </>
  );
}

export default App;
