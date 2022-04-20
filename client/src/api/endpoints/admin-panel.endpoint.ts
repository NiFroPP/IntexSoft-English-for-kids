import { api, Response } from '../api-client/api-client';

import REQUEST_PATH from '../../models/enum/request-path.enum';
import { CreateCategoryRequestDto } from '../../models/dto/request/create-category.request.dto';
import { CreateCategoryResponseDto } from '../../models/dto/response/create-category.response.dto';
import { UpdateCategoryRequestDto } from '../../models/dto/request/update-category.request.dto';
import { UpdateCategoryResponseDto } from '../../models/dto/response/update-category.response.dto';
import { DeleteCategoryRequestDto } from '../../models/dto/request/delete-category.request.dto';
import { CreateCardRequestDto } from '../../models/dto/request/create-card.request.dto';
import { UpdateCardRequestDto } from '../../models/dto/request/update-card.request.dto';
import { DeleteCardRequestDto } from '../../models/dto/request/delete-card.request.dto';
import { ErrorResponseDto } from '../../models/dto/error.response.dto';

const adminPanelEndpoints = {
	async createCategory(
		data: CreateCategoryRequestDto
	): Promise<Response<CreateCategoryResponseDto, ErrorResponseDto>> {
		return api.post<
			CreateCategoryRequestDto,
			CreateCategoryResponseDto,
			ErrorResponseDto
		>(REQUEST_PATH.CREATE_CATEGORY, data);
	},

	async updateCategory(
		name: string,
		data: UpdateCategoryRequestDto
	): Promise<Response<UpdateCategoryResponseDto, ErrorResponseDto>> {
		return api.patch<
			UpdateCategoryRequestDto,
			UpdateCategoryResponseDto,
			ErrorResponseDto
		>(`${REQUEST_PATH.UPDATE_CATEGORY}/${name}`, data);
	},

	async deleteCategory(
		data: DeleteCategoryRequestDto
	): Promise<Response<void, ErrorResponseDto>> {
		return api.delete<void, ErrorResponseDto>(
			`${REQUEST_PATH.DELETE_CATEGORY}/${data.name}`
		);
	},

	async createCard(
		name: string,
		data: CreateCardRequestDto
	): Promise<Response<void, ErrorResponseDto>> {
		return api.post<CreateCardRequestDto, void, ErrorResponseDto>(
			`${REQUEST_PATH.CREATE_CARD}/${name}`,
			data
		);
	},

	async updateCard(
		name: string,
		cardName: string,
		data: UpdateCardRequestDto
	): Promise<Response<void, ErrorResponseDto>> {
		return api.patch<UpdateCardRequestDto, void, ErrorResponseDto>(
			`${REQUEST_PATH.UPDATE_CARD}/${name}/${cardName}`,
			data
		);
	},

	async deleteCard(
		data: DeleteCardRequestDto
	): Promise<Response<void, ErrorResponseDto>> {
		return api.delete<void, ErrorResponseDto>(
			`${REQUEST_PATH.DELETE_CARD}/${data.name}/${data.cards.name}`
		);
	}
};

export default adminPanelEndpoints;
