import {
	AsyncFollowAction,
	AsyncSetUserDataAction,
	SetToggleFollowAction,
	SetUserDataAction,
	User,
	UserActionTypes
} from '../types/user.reducer';
import { FollowRequestDto } from '../../../models/dto/follow.request.dto';

const { SET_DATA, FETCH_FAVORITE_CATEGORIES, SET_TOGGLE_FOLLOW, ASYNC_FOLLOW } =
	UserActionTypes;

export const setUserData = (payload: Partial<User>): SetUserDataAction => ({
	type: SET_DATA,
	payload
});
export const fetchFavoriteCategoriesAC = (): AsyncSetUserDataAction => ({
	type: FETCH_FAVORITE_CATEGORIES
});
export const setToggleFollow = (
	payload: FollowRequestDto
): SetToggleFollowAction => ({
	type: SET_TOGGLE_FOLLOW,
	payload
});
export const asyncSetToggleFollow = (
	payload: FollowRequestDto
): AsyncFollowAction => ({
	type: ASYNC_FOLLOW,
	payload
});
