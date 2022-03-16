import { api, Response } from '../api-client/api-client';

import { ILogin } from '../../pages/Login/login.page';
import { IRegistration } from '../../pages/Registration/registration.page';
import { LoginDto } from '../../models/dto/login.dto';
import { RegistrationDto } from '../../models/dto/registration.dto';
import REQUEST_PATH from '../../models/enum/requestPath.enum';

const authEndpoints = {
	async login(data: ILogin): Promise<Response<LoginDto, { message: string }>> {
		return api.post<ILogin, LoginDto, { message: string }>(
			REQUEST_PATH.LOGIN,
			data
		);
	},

	async registration(
		data: IRegistration
	): Promise<Response<RegistrationDto, { message: string }>> {
		return api.post<IRegistration, RegistrationDto, { message: string }>(
			REQUEST_PATH.REGISTRATION,
			data
		);
	}
};

export default authEndpoints;
