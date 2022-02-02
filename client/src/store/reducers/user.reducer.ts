export interface ActionCreationArguments {
	isLogin?: boolean;
	username?: string;
}

export const SET_DATA = 'SET_DATA';

export interface User {
	isLogin: boolean;
	username: string;
}

const initialStore: User = {
	isLogin: false,
	username: ''
};

type StateType = typeof initialStore;

export const setUserDataActionCreation = (payload: ActionCreationArguments) =>
	({ type: SET_DATA, payload } as const);

type AC1Type = ReturnType<typeof setUserDataActionCreation>;

export type ActionType = AC1Type;

const userReducer = (
	state: StateType = initialStore,
	{ type, payload }: ActionType
): StateType => {
	switch (type) {
		case SET_DATA: {
			return { ...state, ...payload };
		}
		default:
			return state;
	}
};

export default userReducer;
