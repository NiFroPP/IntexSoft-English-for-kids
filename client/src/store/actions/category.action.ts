import { Dispatch } from 'react';

import allEndpoints from '../../api';
import { CategoryRequest } from '../../api/endpoints/category.endpoint';
import {
	CategoryActionType,
	setCategoryData
} from '../reducers/category.reducer';

export const fetchCategories = () => {
	return async (dispatch: Dispatch<CategoryActionType>): Promise<void> => {
		try {
			dispatch(setCategoryData({ isLoading: true }));
			const response =
				await allEndpoints.category.getAllCategoriesWithoutCards();
			dispatch(setCategoryData({ categories: response }));
		} catch (e) {
			dispatch(setCategoryData({ errors: 'Error while loading' }));
		} finally {
			dispatch(setCategoryData({ isLoading: false }));
		}
	};
};

export const fetchCategory = (name: CategoryRequest) => {
	return async (dispatch: Dispatch<CategoryActionType>): Promise<void> => {
		try {
			dispatch(setCategoryData({ isLoading: true }));
			const response = await allEndpoints.category.getOneCategory(name);
			dispatch(setCategoryData({ cards: response.cards }));
		} catch (e) {
			dispatch(setCategoryData({ errors: 'Error while loading' }));
		} finally {
			dispatch(setCategoryData({ isLoading: false }));
		}
	};
};

export const fetchAllWords = () => {
	return async (dispatch: Dispatch<CategoryActionType>): Promise<void> => {
		try {
			dispatch(setCategoryData({ isLoading: true }));
			const response = await allEndpoints.category.getAllWords();
			dispatch(setCategoryData({ words: response }));
		} catch (e) {
			dispatch(setCategoryData({ errors: 'Error while loading' }));
		} finally {
			dispatch(setCategoryData({ isLoading: false }));
		}
	};
};
