import axios from '../axios';

import { WordDto } from '../../models/dto/word.dto';
import { CategoryWithoutCardsDto } from '../../models/dto/categoriesWithoutCards.dto';
import { CategoryRequestDto } from '../../models/dto/category.request.dto';
import { CategoryResponseDto } from '../../models/dto/category.response.dto';
import REQUEST_PATH from '../../models/enum/request-path.enum';

const categoryEndpoints = {
	async getAllCategoriesWithoutCards(): Promise<CategoryWithoutCardsDto[]> {
		const response = await axios.get<CategoryWithoutCardsDto[]>(
			REQUEST_PATH.GET_ALL_CATEGORIES
		);

		return response.data;
	},

	async getAllWords(): Promise<WordDto[]> {
		const response = await axios.get<WordDto[]>(REQUEST_PATH.GET_ALL_WORDS);

		return response.data;
	},

	async getOneCategory(
		category: CategoryRequestDto
	): Promise<CategoryResponseDto> {
		const response = await axios.get<CategoryResponseDto>(
			`${REQUEST_PATH.GET_ONE_CATEGORY}/${category.name}`
		);

		return response.data;
	}
};

export default categoryEndpoints;
