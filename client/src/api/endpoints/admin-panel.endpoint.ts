import axios from '../axios';

import REQUEST_PATH from '../../models/enum/requestPath.enum';
import { CreateCategoryRequestDto } from '../../models/dto/request/createCategory.request.dto';
import { CreateCategoryResponseDto } from '../../models/dto/response/createCategory.response.dto';
import { UpdateCategoryRequestDto } from '../../models/dto/request/updateCategory.request.dto';
import { UpdateCategoryResponseDto } from '../../models/dto/response/updateCategory.response.dto';
import { DeleteCategoryRequestDto } from '../../models/dto/request/deleteCategory.request.dto';
import { CreateWordRequestDto } from '../../models/dto/request/createWord.request.dto';
import { UpdateCardRequestDto } from '../../models/dto/request/updateCard.request.dto';
import { DeleteCardRequestDto } from '../../models/dto/request/deleteCard.request.dto';

const adminPanelEndpoints = {
	async createCategory(
		data: CreateCategoryRequestDto
	): Promise<CreateCategoryResponseDto> {
		const response = await axios.post<CreateCategoryResponseDto>(
			REQUEST_PATH.CREATE_CATEGORY,
			data
		);

		return response.data;
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

	async createCard(name: string, data: CreateWordRequestDto) {
		const response = await axios.post(
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
