export interface ActionCreationArguments {
	email?: string;
	password?: string;
}

export const SET_DATA = 'SET_DATA';

export interface User {
	email: string;
	password: string;
}

const initialStore: User = {
	email: '',
	password: ''
};

type StateType = typeof initialStore;

export type ActionType = AC1Type;

const userReducer = (
	{ type, payload }: ActionType,
	state: StateType = initialStore
): StateType => {
	switch (type) {
		case SET_DATA: {
			return { ...state, ...payload };
		}
		default:
			return state;
	}
};

export const setUserDataActionCreation = (payload: ActionCreationArguments) =>
	({ type: SET_DATA, payload } as const);

type AC1Type = ReturnType<typeof setUserDataActionCreation>;

export default userReducer;
