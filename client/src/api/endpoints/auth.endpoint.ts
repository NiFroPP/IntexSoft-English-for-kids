import { AxiosResponse } from 'axios';

import axios from '../axios';

import { ILogin } from '../../pages/Login/login.page';
import { IRegistration } from '../../pages/Registration/registration.page';
import { LoginResponse } from '../../models/response/loginResponse.model';
import { RegistrationResponse } from '../../models/response/registrationResponse.model';

const authEndpoints = {
	async login(data: ILogin): Promise<AxiosResponse<LoginResponse>> {
		const response = await axios.post<LoginResponse>('/login', data);

		return response;
	},

	async registration(
		data: IRegistration
	): Promise<AxiosResponse<RegistrationResponse>> {
		const response = await axios.post<RegistrationResponse>(
			'/registration',
			data
		);

		return response;
	},

	async getAllUsers(): Promise<AxiosResponse> {
		const response = await axios.get('/get/all');

		return response.data;
	}
};

export default authEndpoints;
