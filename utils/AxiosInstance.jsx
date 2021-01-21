import axios from "axios";

const axiosConfig = {
  baseURL: "http://localhost:3000/",
  url: "http://localhost:3000/",
};

const AxiosInstance = axios.create(axiosConfig);

// ----- DO IT AFTER SUCCESSFUL LOGIN (PUT IT IN MORAN LOGIN SCREEN LOGIC) -----
// AxiosInstance.interceptors.request.use((config) => {
//   config.headers.Authorization = "Bearer " + userToken;
//   return config;
// });

export default AxiosInstance;
