import axios from "axios";
const baseUrl = `http://174.138.123.193:3006/api/v1`;
const mapBaseUrl = `https://api.mapbox.com/directions/v5/mapbox`;
const mapAxios = axios.create({
  baseURL: mapBaseUrl,
});
const serverAxios = axios.create({
  baseURL: baseUrl,
});;
const map_access_token = "pk.eyJ1IjoidmlkeWFtYXJnYW0iLCJhIjoiY2xyeThkM2xlMWk4azJqdGVkdDlwNnE4cSJ9.gsl8JUFq7_8bfZEHpnZ0jA";
export { mapAxios, serverAxios, map_access_token };
