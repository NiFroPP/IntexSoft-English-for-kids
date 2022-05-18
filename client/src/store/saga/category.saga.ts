import { put, takeEvery } from 'redux-saga/effects';
import { setCategoryData } from 'store/reducers/action-creators/category.action';
import allEndpoints from '../../api';
import {
	Category,
	CategoryActionTypes,
	FetchOneCategoryAC
} from '../reducers/types/category.reducer';

const { ALL_WORDS, GET_CATEGORIES, GET_ONE_CATEGORY } = CategoryActionTypes;

type FetchCategoryData = () => Promise<Partial<Category>>;
function* createFetcher(fetchCategoryData: FetchCategoryData) {
	try {
		yield put(setCategoryData({ isLoading: true }));
		yield put(setCategoryData(yield fetchCategoryData()));
	} catch (e) {
		yield put(setCategoryData({ errors: 'Error while loading' }));
	} finally {
		yield put(setCategoryData({ isLoading: false }));
	}
}

function fetchAllWords() {
	return createFetcher(async () => ({
		words: await allEndpoints.category.getAllWords()
	}));
}

function fetchCategories() {
	return createFetcher(async () => ({
		categories: await allEndpoints.category.getAllCategoriesWithoutCards()
	}));
}

function fetchOneCategory({ payload }: FetchOneCategoryAC) {
	return createFetcher(async () => {
		const response = await allEndpoints.category.getOneCategory(payload);
		return {
			cards: response.cards
		};
	});
}

export default function* categorySaga() {
	yield takeEvery(ALL_WORDS, fetchAllWords);
	yield takeEvery(GET_CATEGORIES, fetchCategories);
	yield takeEvery(GET_ONE_CATEGORY, fetchOneCategory);
}
