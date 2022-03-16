import axios from '../axios';
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

const adminPanelEndpoints = {
	async createCategory(
		data: CreateCategoryRequestDto
	): Promise<Response<CreateCategoryResponseDto, { message: string }>> {
		return api.post<
			CreateCategoryRequestDto,
			CreateCategoryResponseDto,
			{ message: string }
		>(REQUEST_PATH.CREATE_CATEGORY, data);
	},

	async updateCategory(
		name: string,
		data: UpdateCategoryRequestDto
	): Promise<UpdateCategoryResponseDto> {
		const response = await axios.patch<UpdateCategoryResponseDto>(
			`${REQUEST_PATH.UPDATE_CATEGORY}/${name}`,
			data
		);

		return response.data;
	},

	async deleteCategory(data: DeleteCategoryRequestDto): Promise<void> {
		const response = await axios.delete<void>(
			`${REQUEST_PATH.DELETE_CATEGORY}/${data.name}`
		);

		return response.data;
	},

	async createCard(name: string, data: CreateCardRequestDto): Promise<void> {
		const response = await axios.post<void>(
			`${REQUEST_PATH.CREATE_CARD}/${name}`,
			data
		);

		return response.data;
	},

	async updateCard(
		name: string,
		cardName: string,
		data: UpdateCardRequestDto
	): Promise<void> {
		const response = await axios.patch<void>(
			`${REQUEST_PATH.UPDATE_CARD}/${name}/${cardName}`,
			data
		);

		return response.data;
	},

	async deleteCard(data: DeleteCardRequestDto): Promise<void> {
		const response = await axios.delete<void>(
			`${REQUEST_PATH.DELETE_CARD}/${data.name}/${data.cards.name}`
		);

		return response.data;
	}
};

export default adminPanelEndpoints;
