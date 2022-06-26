import { takeEvery } from "redux-saga/effects";
import userLoginSaga from "./sagas";
export function* sagaWatcher() {
  yield takeEvery("LOGIN_REQUEST", userLoginSaga);
}
