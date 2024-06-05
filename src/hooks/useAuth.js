import { useState } from "react";
import {serverAxios} from "../utils/axiosInstance";

function useAuth() {
  const [userDetails, setUserDetails] = useState(null);
  const handleLogin = (email, password) => {
    serverAxios
      .post("/user/login", {
        email: email,
        password: password,
      })
      .then(({ data }) => {
        console.log(data.response.data);
        localStorage.setItem("userDetails", JSON.stringify(data.response.data));
        setUserDetails(data.response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return { userDetails, setUserDetails, handleLogin };
}

export default useAuth;
