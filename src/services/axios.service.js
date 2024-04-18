import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://enterprise-web-software-development-dryr.onrender.com/',
  withCredentials: true
});

axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // const token = localStorage.getItem('accessToken') ?? '';


    // config.headers.Authorization = `Bearer ${token}`
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

export default axiosInstance;