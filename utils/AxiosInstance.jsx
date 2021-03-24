import axios from "axios";

const axiosConfig = {
  baseURL: "http://10.0.0.13:3000/",
  url: "http://10.0.0.13:3000/",
};

const AxiosInstance = axios.create(axiosConfig);

export default AxiosInstance;
