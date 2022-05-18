import { FollowRequestDto } from '../../../models/dto/follow.request.dto';

export enum UserActionTypes {
	SET_DATA = '[user-reducer] SET_DATA',
	FETCH_FAVORITE_CATEGORIES = '[user-reducer] FETCH_FAVORITE_CATEGORIES',
	SET_TOGGLE_FOLLOW = '[user-reducer] SET_TOGGLE_FOLLOW',
	ASYNC_FOLLOW = '[user-reducer] ASYNC_FOLLOW'
}

export type User = {
	isLogin: boolean;
	isAdmin: boolean;
	isFetching: boolean;
	errors: null | string;
	username: string;
	favoriteCategories: string[];
};

export type SetUserDataAction = {
	type: UserActionTypes.SET_DATA;
	payload: Partial<User>;
};
export type AsyncSetUserDataAction = {
	type: UserActionTypes.FETCH_FAVORITE_CATEGORIES;
};
export type SetToggleFollowAction = {
	type: UserActionTypes.SET_TOGGLE_FOLLOW;
	payload: FollowRequestDto;
};
export type AsyncFollowAction = {
	type: UserActionTypes.ASYNC_FOLLOW;
	payload: FollowRequestDto;
};

export type UserActionType = SetUserDataAction | SetToggleFollowAction;
