import axios, { AxiosInstance } from 'axios';

import axiosInstance from '../axios';

export type Response<D, E> =
	| {
			error: false;
			data: D;
	  }
	| {
			error: true;
			data: E;
	  };

class ApiClient {
	private readonly axiosInstance;

	constructor(axiosInstance: AxiosInstance) {
		this.axiosInstance = axiosInstance;
	}

	async post<D, R, E>(url: string, data: D): Promise<Response<R, E>> {
		try {
			const response = await this.axiosInstance.post<R>(url, data);

			return {
				error: false,
				data: response.data as R
			};
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return {
					error: true,
					data: error.response?.data as E
				};
			}

			throw error;
		}
	}
}

export const api = new ApiClient(axiosInstance);
