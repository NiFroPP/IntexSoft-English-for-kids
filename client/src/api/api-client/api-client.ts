import axios, { AxiosInstance, Method } from 'axios';

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

	async request<D, R, E>(
		method: Method,
		url: string,
		data?: D
	): Promise<Response<R, E>> {
		try {
			const response = await this.axiosInstance.request<R>({
				url,
				data,
				method
			});

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

	async post<D, R, E>(url: string, data: D): Promise<Response<R, E>> {
		return this.request('POST', url, data);
	}

	async patch<D, R, E>(url: string, data: D): Promise<Response<R, E>> {
		return this.request('PATCH', url, data);
	}

	async delete<R, E>(url: string): Promise<Response<R, E>> {
		return this.request('DELETE', url);
	}
}

export const api = new ApiClient(axiosInstance);
