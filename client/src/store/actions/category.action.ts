import { Dispatch } from 'react';

import {
	CategoryActionType,
	setCategoryDataActionCreation
} from '../reducers/caregory.reducer';
import allEndpoints from '../../api';

export const fetchCategories = () => {
	return async (dispatch: Dispatch<CategoryActionType>) => {
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
