import { spawn } from 'redux-saga/effects';
import userSaga from './user.saga';
import categorySaga from './category.saga';

export default function* rootSaga() {
	yield spawn(userSaga);
	yield spawn(categorySaga);
}
