import { Dispatch } from 'react';

import allEndpoints from '../../api';
import { CategoryRequestDto } from '../../models/dto/category.request.dto';
import {
	Category,
	CategoryActionType,
	setCategoryData
} from '../reducers/category.reducer';

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

export const fetchCategories = () => {
	return createFetcher(async () => {
		return {
			categories: await allEndpoints.category.getAllCategoriesWithoutCards()
		};
	});
};

export const fetchCategory = (name: CategoryRequestDto) => {
	return createFetcher(async () => {
		const response = await allEndpoints.category.getOneCategory(name);
		return {
			cards: response.cards
		};
	});
};

export const fetchAllWords = () => {
	return createFetcher(async () => {
		return {
			words: await allEndpoints.category.getAllWords()
		};
	});
};
