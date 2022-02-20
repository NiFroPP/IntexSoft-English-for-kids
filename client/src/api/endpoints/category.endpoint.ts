import axios from '../axios';

import { CategoryWithoutCards } from '../../models/response/categoriesWithoutCards.model';
import REQUEST_PATH from '../../models/enum/requestPath.enum';
import { OneCategory } from '../../models/response/oneCaregory.model';

export interface CategoryRequest {
	name?: string;
}

const categoryEndpoints = {
	async getAllCategoriesWithoutCards(): Promise<CategoryWithoutCards[]> {
		const response = await axios.get<CategoryWithoutCards[]>(
			REQUEST_PATH.GET_ALL_CATEGORIES
		);

		return response.data;
	},

	async getOneCategory(data: CategoryRequest): Promise<OneCategory> {
		const response = await axios.post<OneCategory>(
			REQUEST_PATH.GET_ONE_CATEGORY,
			data
		);

		return response.data;
	}
};

export default categoryEndpoints;
