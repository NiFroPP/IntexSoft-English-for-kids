import { AllWordsDto } from 'models/dto/allWords.dto';
import { CategoryWithoutCardsDto } from 'models/dto/categoriesWithoutCards.dto';
import { Card } from '../../pages/Category/category.page';

export interface CategoryActionCreationArguments {
	isLoading?: boolean;
	categories?: CategoryWithoutCardsDto[];
	cards?: Card[];
	errors?: null | string;
	words?: AllWordsDto[];
}

export const SET_DATA = '[category-reducer] SET_DATA';

export interface Category {
	isLoading: boolean;
	categories: CategoryWithoutCardsDto[];
	cards: Card[];
	errors: null | string;
	words: AllWordsDto[];
}

const initialStore: Category = {
	isLoading: false,
	categories: [],
	cards: [],
	errors: null,
	words: []
};

type StateType = typeof initialStore;

const categoryReducer = (
	state: StateType = initialStore,
	{ type, payload }: CategoryActionType
): StateType => {
	switch (type) {
		case SET_DATA: {
			return { ...state, ...payload };
		}
		default:
			return state;
	}
};

export const setCategoryDataActionCreation = (
	payload: CategoryActionCreationArguments
) => ({ type: SET_DATA, payload } as const);

export type CategoryActionType = ReturnType<
	typeof setCategoryDataActionCreation
>;

export default categoryReducer;
