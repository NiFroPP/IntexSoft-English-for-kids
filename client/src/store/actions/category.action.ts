import { Dispatch } from 'react';

import allEndpoints from '../../api';
import { CategoryRequest } from '../../api/endpoints/category.endpoint';
import {
	CategoryActionType,
	setCategoryDataActionCreation
} from '../reducers/caregory.reducer';

export const fetchCategories = () => {
	return async (dispatch: Dispatch<CategoryActionType>): Promise<void> => {
		try {
			dispatch(setCategoryDataActionCreation({ isLoading: true }));
			const response =
				await allEndpoints.category.getAllCategoriesWithoutCards();
			dispatch(setCategoryDataActionCreation({ categories: response }));
		} catch (e) {
			dispatch(
				setCategoryDataActionCreation({ errors: 'Error while loading' })
			);
		} finally {
			dispatch(setCategoryDataActionCreation({ isLoading: false }));
		}
	};
};

export const fetchCategory = (name: CategoryRequest) => {
	return async (dispatch: Dispatch<CategoryActionType>): Promise<void> => {
		try {
			dispatch(setCategoryDataActionCreation({ isLoading: true }));
			const response = await allEndpoints.category.getOneCategory(name);
			dispatch(setCategoryDataActionCreation({ cards: response.cards }));
		} catch (e) {
			dispatch(
				setCategoryDataActionCreation({ errors: 'Error while loading' })
			);
		} finally {
			dispatch(setCategoryDataActionCreation({ isLoading: false }));
		}
	};
};

export const fetchAllWords = () => {
	return async (dispatch: Dispatch<CategoryActionType>): Promise<void> => {
		try {
			dispatch(setCategoryDataActionCreation({ isLoading: true }));
			const response = await allEndpoints.category.getAllWords();
			dispatch(setCategoryDataActionCreation({ words: response }));
		} catch (e) {
			dispatch(
				setCategoryDataActionCreation({ errors: 'Error while loading' })
			);
		} finally {
			dispatch(setCategoryDataActionCreation({ isLoading: false }));
		}
	};
};
