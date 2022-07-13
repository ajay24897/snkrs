import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { userAuthReducer } from "./reducer/userAuth";
import { cartDetailsReducer } from "./reducer/cartDetails";

import { sagaWatcher } from "./saga";

const rootReducer = combineReducers({
  userAuthReducer,
  cartDetailsReducer,
});

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

export default store;

sagaMiddleware.run(sagaWatcher);
