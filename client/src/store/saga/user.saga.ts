import { call, put, takeEvery } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import {
	setToggleFollow,
	setUserData
} from 'store/reducers/action-creators/user.action';
import allEndpoints from '../../api';
import {
	AsyncFollowAction,
	UserActionTypes
} from '../reducers/types/user.reducer';

const { FETCH_FAVORITE_CATEGORIES, ASYNC_FOLLOW } = UserActionTypes;

function* fetchFavoriteCategories() {
	try {
		yield put(setUserData({ isFetching: true }));
		const response: AxiosResponse<string[]> = yield call(
			allEndpoints.auth.getUserCategories
		);
		yield put(setUserData({ favoriteCategories: response.data }));
	} catch (e) {
		yield put(setUserData({ errors: 'Error while loading' }));
	} finally {
		yield put(setUserData({ isFetching: false }));
	}
}

function* followFavoriteCategories({ payload }: AsyncFollowAction) {
	try {
		yield put(setUserData({ isFetching: true }));
		yield put(setToggleFollow(payload));
		yield call(allEndpoints.auth.followCategories, payload);
	} catch (e) {
		yield put(setUserData({ errors: 'Error while loading' }));
	} finally {
		yield put(setUserData({ isFetching: false }));
	}
}

export default function* userSaga() {
	yield takeEvery(FETCH_FAVORITE_CATEGORIES, fetchFavoriteCategories);
	yield takeEvery(ASYNC_FOLLOW, followFavoriteCategories);
}
