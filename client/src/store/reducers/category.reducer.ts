import { setCategoryData } from './action-creators/category.action';
import { Category, CategoryActionTypes } from './types/category.reducer';

const { SET_DATA } = CategoryActionTypes;

export type CategoryActionType = ReturnType<typeof setCategoryData>;

const initialStore: Category = {
	isLoading: false,
	categories: [],
	cards: [],
	errors: null,
	words: []
};

const categoryReducer = (
	state: Category = initialStore,
	{ type, payload }: CategoryActionType
): Category => {
	switch (type) {
		case SET_DATA: {
			return { ...state, ...payload };
		}
		default:
			return state;
	}
};

export default categoryReducer;
