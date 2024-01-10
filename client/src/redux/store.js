import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';

const middlewares = [reduxThunk];

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));
