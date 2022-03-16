import { WordDto } from 'models/dto/word.dto';
import { CategoryWithoutCardsDto } from 'models/dto/categoriesWithoutCards.dto';
import { Card } from '../../pages/Category/category.page';

export const SET_DATA = '[category-reducer] SET_DATA';

export type CategoryActionType = ReturnType<typeof setCategoryData>;
export interface Category {
	isLoading: boolean;
	categories: CategoryWithoutCardsDto[];
	cards: Card[];
	errors: null | string;
	words: WordDto[];
}

const initialStore: Category = {
	isLoading: false,
	categories: [],
	cards: [],
	errors: null,
	words: []
};

export const setCategoryData = (payload: Partial<Category>) => ({
	type: SET_DATA,
	payload
});

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
