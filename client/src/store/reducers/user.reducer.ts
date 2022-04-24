export const SET_DATA = '[user-reducer] SET_DATA';

export type UserActionType = ReturnType<typeof setUserData>;
export interface User {
	isLogin: boolean;
	isAdmin: boolean;
	username: string;
}

const initialStore: User = {
	isLogin: false,
	isAdmin: false,
	username: ''
};

export const setUserData = (payload: Partial<User>) => ({
	type: SET_DATA,
	payload
});

const userReducer = (
	state: User = initialStore,
	{ type, payload }: UserActionType
): User => {
	switch (type) {
		case SET_DATA: {
			return { ...state, ...payload };
		}
		default:
			return state;
	}
};

export default userReducer;
