import {
	Category,
	CategoryActionTypes,
	FetchAllWordsAC,
	FetchCategoriesAC,
	FetchOneCategoryAC
} from '../types/category.reducer';
import { CategoryRequestDto } from '../../../models/dto/category.request.dto';

const { SET_DATA, ALL_WORDS, GET_CATEGORIES, GET_ONE_CATEGORY } =
	CategoryActionTypes;

export const setCategoryData = (payload: Partial<Category>) => ({
	type: SET_DATA,
	payload
});
export const fetchAllWordsAC = (): FetchAllWordsAC => ({
	type: ALL_WORDS
});
export const fetchCategoriesAC = (): FetchCategoriesAC => ({
	type: GET_CATEGORIES
});
export const fetchOneCategoryAC = (
	name: CategoryRequestDto
): FetchOneCategoryAC => ({
	type: GET_ONE_CATEGORY,
	payload: name
});
