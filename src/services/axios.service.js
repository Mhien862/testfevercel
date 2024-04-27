import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://enterprise-web-software-development.onrender.com",
  //baseURL: "http://localhost:1000",

  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = JSON.parse(localStorage.getItem("userProfile")) ?? "";
    config.headers.Authorization = token.accessToken;
    config.headers["user-id"] = token._id;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default axiosInstance;
