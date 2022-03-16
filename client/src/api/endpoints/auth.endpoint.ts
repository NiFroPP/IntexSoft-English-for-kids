import { api, Response } from '../api-client/api-client';

import { LoginRequestDto } from '../../models/dto/login.request.dto';
import { LoginResponseDto } from '../../models/dto/login.response.dto';
import { RegistrationRequestDto } from '../../models/dto/registration.request.dto';
import { RegistrationResponseDto } from '../../models/dto/registration.response.dto';
import REQUEST_PATH from '../../models/enum/request-path.enum';

const authEndpoints = {
	async login(
		data: LoginRequestDto
	): Promise<Response<LoginResponseDto, { message: string }>> {
		return api.post<LoginRequestDto, LoginResponseDto, { message: string }>(
			REQUEST_PATH.LOGIN,
			data
		);
	},

	async registration(
		data: RegistrationRequestDto
	): Promise<Response<RegistrationResponseDto, { message: string }>> {
		return api.post<
			RegistrationRequestDto,
			RegistrationResponseDto,
			{ message: string }
		>(REQUEST_PATH.REGISTRATION, data);
	}
};

export default authEndpoints;
