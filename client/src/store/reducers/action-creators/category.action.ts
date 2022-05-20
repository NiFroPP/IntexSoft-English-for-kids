import {
	Category,
	CategoryActionTypes,
	FetchAllWordsAC,
	FetchCategoriesAC,
	FetchOneCategoryAC,
	UpdateCategoriesAC,
	UpdateCategoriesProps
} from '../types/category.reducer';
import { CategoryRequestDto } from '../../../models/dto/category.request.dto';

const {
	SET_DATA,
	ALL_WORDS,
	GET_CATEGORIES,
	GET_ONE_CATEGORY,
	UPDATE_CATEGORIES
} = CategoryActionTypes;

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
export const updateCategoriesAC = (
	payload: UpdateCategoriesProps
): UpdateCategoriesAC => ({
	type: UPDATE_CATEGORIES,
	payload
});
