import { Dispatch } from 'react';
import { setCategoryData } from 'store/reducers/action-creators/category.action';
import { Category } from 'store/reducers/types/category.reducer';
import { CategoryActionType } from '../reducers/category.reducer';

type FetchCategoryData = () => Promise<Partial<Category>>;

const createFetcher = (fetchCategoryData: FetchCategoryData) => {
	return async (dispatch: Dispatch<CategoryActionType>): Promise<void> => {
		try {
			dispatch(setCategoryData({ isLoading: true }));
			dispatch(setCategoryData(await fetchCategoryData()));
		} catch (e) {
			dispatch(setCategoryData({ errors: 'Error while loading' }));
		} finally {
			dispatch(setCategoryData({ isLoading: false }));
		}
	};
};

// export const fetchCategory = (name: CategoryRequestDto) => {
// 	return createFetcher(async () => {
// 		const response = await allEndpoints.category.getOneCategory(name);
// 		return {
// 			cards: response.cards
// 		};
// 	});
// };
