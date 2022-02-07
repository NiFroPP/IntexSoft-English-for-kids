import { combineReducers } from 'redux';

import userReducer from './user.reducer';
import categoryReducer from './caregory.reducer';

const reducer = combineReducers({
	user: userReducer,
	category: categoryReducer
});

export default reducer;
