import { AxiosResponse } from 'axios';
import { api, Response } from '../api-client/api-client';
import axios from '../axios';

import REQUEST_PATH from '../../models/enum/request-path.enum';
import { LoginRequestDto } from '../../models/dto/login.request.dto';
import { LoginResponseDto } from '../../models/dto/login.response.dto';
import { RegistrationRequestDto } from '../../models/dto/registration.request.dto';
import { RegistrationResponseDto } from '../../models/dto/registration.response.dto';
import { ErrorResponseDto } from '../../models/dto/error.response.dto';
import { FollowRequestDto } from '../../models/dto/follow.request.dto';

const authEndpoints = {
	async login(
		data: LoginRequestDto
	): Promise<Response<LoginResponseDto, ErrorResponseDto>> {
		return api.post<LoginRequestDto, LoginResponseDto, ErrorResponseDto>(
			REQUEST_PATH.LOGIN,
			data
		);
	},

	async registration(
		data: RegistrationRequestDto
	): Promise<Response<RegistrationResponseDto, ErrorResponseDto>> {
		return api.post<
			RegistrationRequestDto,
			RegistrationResponseDto,
			ErrorResponseDto
		>(REQUEST_PATH.REGISTRATION, data);
	},

	async followCategories(
		data: FollowRequestDto
	): Promise<Response<void, ErrorResponseDto>> {
		return api.post<FollowRequestDto, void, ErrorResponseDto>(
			REQUEST_PATH.FOLLOW,
			data
		);
	},

	getUserCategories(): Promise<AxiosResponse<string[]>> {
		return axios.get<string[]>(REQUEST_PATH.FAVORITE);
	}
};

export default authEndpoints;
