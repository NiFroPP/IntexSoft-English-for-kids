import {
	Category,
	UpdateCategoriesProps
} from '../reducers/types/category.reducer';

export const getUpdateCategories = (
	state: Category,
	payload: UpdateCategoriesProps
) =>
	state.categories.map((c) =>
		c.name === payload.name ? { ...c, name: payload.newName } : { ...c }
	);
