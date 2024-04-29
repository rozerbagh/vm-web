import {useEffect, useState} from 'react'
import axios from 'axios';

function useAuth() {
  const [userDetails, setUserDetails] = useState(null)
  const handleLogin = (email, password) => {
    axios
      .post("http://174.138.123.193:3006/api/v1/user/login", {
        email: "rozerbagh456@gmail.com",
        password: "19Vicky93@",
      })
      .then(({ data }) => {
        console.log(data.response.data);
        localStorage.setItem("userDetails", JSON.stringify(data.response.data));
        setUserDetails(data.response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    const userd = JSON.parse(localStorage.getItem("userDetails"));
    if (userd?.token) {
      setUserDetails(userd)
    }
  }, []);
  return { userDetails, handleLogin };
}

export default useAuth