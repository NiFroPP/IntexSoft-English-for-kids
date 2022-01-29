import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from './reducers';

const composeDev = composeWithDevTools || compose;
const devTools = composeDev(applyMiddleware(thunk));

const store = createStore(reducer, devTools);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
