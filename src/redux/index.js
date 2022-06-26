import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { userAuthReducer } from "./reducer/userAuth";
import { sagaWatcher } from "./saga";

const rootReducer = combineReducers({
  userAuthReducer,
});

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

export default store;

sagaMiddleware.run(sagaWatcher);
