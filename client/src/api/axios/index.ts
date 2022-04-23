import axios, { AxiosRequestConfig } from 'axios';

export const API_URL = 'http://localhost:4000';

const axiosInstance = axios.create({
	baseURL: API_URL
});

axiosInstance.interceptors.request.use(
	(config: AxiosRequestConfig): AxiosRequestConfig => {
		const authToken = localStorage.getItem('auth-token');

		if (authToken) {
			config.headers = config.headers || {};
			config.headers.Authorization = `Bearer ${JSON.parse(authToken).token}`;
		}

		return config;
	}
);

export default axiosInstance;
