import axios from "axios";

const apiCall = axios.create({
  baseURL: "/api",
  withCredentials: true,
  timeout: 10000,
});

export default apiCall;
