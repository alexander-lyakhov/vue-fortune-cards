import { ref } from 'vue'
import axios from 'axios';
import type {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosError
} from 'axios';

export const isLoading = ref<boolean>(false)

const axiosInstance: AxiosInstance = axios.create({
  // baseURL: import.meta.env.BASE_URL,
  baseURL: 'https://fortunecards-b2gmfjgkg4dteag4.westeurope-01.azurewebsites.net/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    isLoading.value = true
    return config;
  },
  (error: AxiosError) => {
    isLoading.value = false
    return Promise.reject(error);
  }
);

// Response interceptor (for error handling or transforming response)
axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    isLoading.value = false
    return response;
  },
  (error: AxiosError) => {
    isLoading.value = false
    console.error('API Error:', error.response);
    return Promise.reject(error);
  }
);
/*
export function setToken(token: string) {
  axiosInstance.defaults.headers['Authorization'] =  token;
}

export function removeToken() {
  axiosInstance.defaults.headers['Authorization'] =  null;
}
*/
export default axiosInstance
