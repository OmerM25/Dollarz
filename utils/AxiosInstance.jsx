import axios from "axios";

const axiosConfig = {
  baseURL: "http://localhost:3000/",
  url: "http://localhost:3000/",
};

const AxiosInstance = axios.create(axiosConfig);

export default AxiosInstance;
