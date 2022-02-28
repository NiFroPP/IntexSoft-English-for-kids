import { AxiosResponse } from 'axios';

import axios from '../axios';

import { ILogin } from '../../pages/Login/login.page';
import { IRegistration } from '../../pages/Registration/registration.page';
import { LoginDto } from '../../models/dto/login.dto';
import { RegistrationDto } from '../../models/dto/registration.dto';
import REQUEST_PATH from '../../models/enum/requestPath.enum';

const authEndpoints = {
	async login(data: ILogin): Promise<AxiosResponse<LoginDto>> {
		const response = await axios.post<LoginDto>(REQUEST_PATH.LOGIN, data);

		return response;
	},

	async registration(
		data: IRegistration
	): Promise<AxiosResponse<RegistrationDto>> {
		const response = await axios.post<RegistrationDto>(
			REQUEST_PATH.REGISTRATION,
			data
		);

		return response;
	}
};

export default authEndpoints;
