import axios from "axios";
import { baseUrl } from "./config";

let instance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json"
  }
});

instance.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

export default instance;
