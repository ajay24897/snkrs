import { Auth } from "../../firebase/services/auth.services";
import { put } from "redux-saga/effects";

export function* userLoginSaga(action) {
  let { email, password } = action.data;
  console.log("ajay", action.data);

  try {
    if (email && password) {
      let res = yield Auth.signIn(email, password);
      yield put({ type: "LOGIN_SUCCESS", data: res.user });
    } else
      yield put({
        type: "LOGIN_SUCCESS",
        data: action.data,
      });

    console.log("success");
  } catch (error) {
    console.log("dedede", error.message);
    yield put({ type: "LOGIN_FAILED", data: error.message });
  }
}

export function* userSignUpSaga(action) {
  let { email, password } = action.data;
  console.log("userSignUpSaga", action.data);

  try {
    let res = yield Auth.createUser(email, password);
    yield put({ type: "SIGN_UP_SUCCESS", data: res.user });

    console.log("SIGN_UP_FAILED success");
  } catch (error) {
    console.log("SIGN_UP_FAILED", error.message);
    yield put({ type: "SIGN_UP_FAILED", data: error.message });
  }
}
