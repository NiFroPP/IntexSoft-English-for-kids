import {
	Category,
	CategoryActionType,
	CategoryActionTypes
} from './types/category.reducer';
import { getUpdateCategories } from '../utils/getUpdateCategories';

const { SET_DATA, UPDATE_CATEGORIES } = CategoryActionTypes;

const initialStore: Category = {
	isLoading: false,
	categories: [],
	cards: [],
	errors: null,
	words: []
};

const categoryReducer = (
	state: Category = initialStore,
	action: CategoryActionType
): Category => {
	switch (action.type) {
		case SET_DATA: {
			return { ...state, ...action.payload };
		}
		case UPDATE_CATEGORIES: {
			return {
				...state,
				categories: getUpdateCategories(state, action.payload)
			};
		}

		default:
			return state;
	}
};

export default categoryReducer;
