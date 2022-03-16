import axios from '../axios';

import { AllWordsDto } from '../../models/dto/allWords.dto';
import { CategoryWithoutCardsDto } from '../../models/dto/categoriesWithoutCards.dto';
import { OneCategoryDto } from '../../models/dto/oneCaregory.dto';
import REQUEST_PATH from '../../models/enum/requestPath.enum';

export interface CategoryRequest {
	name?: string;
}

const categoryEndpoints = {
	async getAllCategoriesWithoutCards(): Promise<CategoryWithoutCardsDto[]> {
		const response = await axios.get<CategoryWithoutCardsDto[]>(
			REQUEST_PATH.GET_ALL_CATEGORIES
		);

		return response.data;
	},

	async getAllWords(): Promise<AllWordsDto[]> {
		const response = await axios.get<AllWordsDto[]>(REQUEST_PATH.GET_ALL_WORDS);

		return response.data;
	},

	async getOneCategory(data: CategoryRequest): Promise<OneCategoryDto> {
		const response = await axios.get<OneCategoryDto>(
			`${REQUEST_PATH.GET_ONE_CATEGORY}/${data.name}`
		);

		return response.data;
	}
};

export default categoryEndpoints;
