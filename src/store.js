import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from "./rootReducer";
import { composeWithDevTools } from '@redux-devtools/extension';
import { logger } from 'redux-logger';

const initialstate = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialstate,
  composeWithDevTools(applyMiddleware(...middleware, logger))
);
export default store;

