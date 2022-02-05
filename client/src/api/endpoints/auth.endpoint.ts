import { AxiosResponse } from 'axios';

import axios from '../axios';

import { ILogin } from '../../pages/Login/login.page';
import { IRegistration } from '../../pages/Registration/registration.page';
import { LoginResponse } from '../../models/response/loginResponse.model';
import { RegistrationResponse } from '../../models/response/registrationResponse.model';
import PATHS from '../../models/enum/paths.enum';

const authEndpoints = {
	async login(data: ILogin): Promise<AxiosResponse<LoginResponse>> {
		const response = await axios.post<LoginResponse>(PATHS.LOGIN, data);

		return response;
	},

	async registration(
		data: IRegistration
	): Promise<AxiosResponse<RegistrationResponse>> {
		const response = await axios.post<RegistrationResponse>(
			PATHS.REGISTRATION,
			data
		);

		return response;
	}
};

export default authEndpoints;
