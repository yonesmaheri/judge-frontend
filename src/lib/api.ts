import axios from "axios";

const apiCall = axios.create({
  baseURL: "https://yonesma.ir/api",
  withCredentials: true,
  timeout: 10000,
});

export default apiCall;
