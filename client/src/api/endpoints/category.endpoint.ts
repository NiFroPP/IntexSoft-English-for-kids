import axios from '../axios';
import { CategoryWithoutCards } from '../../models/response/categoriesWithoutCards.model';
import REQUEST_PATH from '../../models/enum/requestPath.enum';

const categoryEndpoints = {
	async getAllCategoriesWithoutCards(): Promise<CategoryWithoutCards[]> {
		const response = await axios.get<CategoryWithoutCards[]>(
			REQUEST_PATH.GET_ALL_CATEGORIES
		);

		return response.data;
	}
};

export default categoryEndpoints;
