import { CategoryWithoutCardsDto } from '../../../models/dto/categoriesWithoutCards.dto';
import { Card } from '../../../pages/Category/category.page';
import { WordDto } from '../../../models/dto/word.dto';
import { CategoryRequestDto } from '../../../models/dto/category.request.dto';

export interface Category {
	isLoading: boolean;
	categories: CategoryWithoutCardsDto[];
	cards: Card[];
	errors: null | string;
	words: WordDto[];
}

export enum CategoryActionTypes {
	SET_DATA = '[category-reducer] SET_DATA',
	ALL_WORDS = '[category-reducer] ALL_WORDS',
	GET_CATEGORIES = '[category-reducer] GET_CATEGORIES',
	GET_ONE_CATEGORY = '[category-reducer] GET_ONE_CATEGORY',
	UPDATE_CATEGORIES = '[category-reducer] UPDATE_CATEGORIES'
}

export type SetDataAC = {
	type: CategoryActionTypes.SET_DATA;
	payload: Partial<Category>;
};
export type FetchAllWordsAC = {
	type: CategoryActionTypes.ALL_WORDS;
};
export type FetchCategoriesAC = {
	type: CategoryActionTypes.GET_CATEGORIES;
};
export type FetchOneCategoryAC = {
	type: CategoryActionTypes.GET_ONE_CATEGORY;
	payload: CategoryRequestDto;
};
export type UpdateCategoriesAC = {
	type: CategoryActionTypes.UPDATE_CATEGORIES;
	payload: UpdateCategoriesProps;
};
export type UpdateCategoriesProps = {
	newName: string;
	name: string;
};

export type CategoryActionType = SetDataAC | UpdateCategoriesAC;
