import axios from "axios";

const apiCall = axios.create({
  baseURL: "https://yonesma.ir/api",
  timeout: 10000,
});
apiCall.interceptors.request.use(async (config) => {
  const response = await fetch("/back/auth/");
  const accessToken = await response.json();
  if (response.ok) {
    config.headers.Authorization = `Bearer ${accessToken.value}`;
  }
  return config;
});
export default apiCall;
