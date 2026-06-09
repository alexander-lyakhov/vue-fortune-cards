import axios, {  } from 'axios';
import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig, AxiosError }  from 'axios';

const axiosInstance: AxiosInstance = axios.create({
	baseURL: import.meta.env.BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	timeout: 10000,
});

axiosInstance.interceptors.request.use(
	(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
		return config;
	},
	(error: AxiosError) => {
		return Promise.reject(error);
	}
);

// Response interceptor (for error handling or transforming response)
axiosInstance.interceptors.response.use(
	(response: AxiosResponse): AxiosResponse => {
		return response;
	},
	(error: AxiosError) => {
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
export default axiosInstance as axios
