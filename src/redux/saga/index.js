import { takeEvery } from "redux-saga/effects";
import { userLoginSaga, userSignUpSaga } from "./sagas";
export function* sagaWatcher() {
  yield takeEvery("LOGIN_REQUEST", userLoginSaga);
  yield takeEvery("SIGN_UP_REQUEST", userSignUpSaga);
}
