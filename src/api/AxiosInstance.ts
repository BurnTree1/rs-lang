import axios from 'axios';
import { baseUrl } from './consts';
import { LocalStorageService } from './LocalStorageService';

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: baseUrl
})

axiosInstance.interceptors.request.use(
  config => {
    const token = LocalStorageService.getToken();
    if (token !== null) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers.Accept = "application/json"
      config.headers.patch.contentType = "application/json"
    }
    return config
  },
  error => {
    console.log(error.response);
    return Promise.reject(error);
  }
)

export default axiosInstance;
