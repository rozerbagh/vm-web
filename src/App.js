import React, { useContext, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "./App.css";
import CustomMap from "./CustomMap";
import LoginPage from "./components/Login";
import { AppContext } from "./contexts/AppContext";
// import GoogleMap from "./components/GoogleMap";
mapboxgl.accessToken =
  "pk.eyJ1IjoidmlkeWFtYXJnYW0iLCJhIjoiY2xyeThkM2xlMWk4azJqdGVkdDlwNnE4cSJ9.gsl8JUFq7_8bfZEHpnZ0jA";

function App() {
  const { userDetails } = useContext(AppContext);
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    const userd = JSON.parse(localStorage.getItem("userDetails"));
    if(userd?.token) {
      setIsAuth(true);
    }
  }, []);
  return <>{isAuth ? <CustomMap />: <LoginPage /> }</>;
}

export default App;
