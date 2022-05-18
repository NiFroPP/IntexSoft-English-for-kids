import { User, UserActionType, UserActionTypes } from './types/user.reducer';
import { getFavoriteCategories } from '../utils/getFavoriteCategories';

const { SET_DATA, SET_TOGGLE_FOLLOW } = UserActionTypes;

const initialStore: User = {
	isLogin: false,
	isAdmin: false,
	isFetching: false,
	errors: null,
	username: '',
	favoriteCategories: []
};

const userReducer = (
	state: User = initialStore,
	action: UserActionType
): User => {
	switch (action.type) {
		case SET_DATA: {
			return { ...state, ...action.payload };
		}
		case SET_TOGGLE_FOLLOW: {
			return {
				...state,
				favoriteCategories: getFavoriteCategories(state, action.payload)
			};
		}
		default:
			return state;
	}
};

export default userReducer;
