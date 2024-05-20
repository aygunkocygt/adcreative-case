import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

const HOST_API = 'YOUR_API_BASE_URL_HERE';

const axiosInstance: AxiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.response.use(
  (res: AxiosResponse) => res,
  (error: AxiosError) => {
    const errorMessage = error.response?.data || 'Something went wrong';
    return Promise.reject(errorMessage);
  }
);

export default axiosInstance;
