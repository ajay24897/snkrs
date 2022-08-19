import { Auth } from "../../firebase/services/auth.services";
import { put } from "redux-saga/effects";
import { cartApi } from "../../firebase/services/snkrs.services";
import { firebaseData } from "../../common/function";

export function* userLoginSaga(action) {
  let { email, password } = action.data;

  try {
    if (email && password) {
      let res = yield Auth.signIn(email, password);
      let cartItem = yield cartApi.getSnkr(email);

      yield put({ type: "INITIAL_CART_ITEM", data: firebaseData(cartItem) });
      yield put({ type: "LOGIN_SUCCESS", data: res.user });
    } else {
      let cartItem = yield cartApi.getSnkr(email);

      yield put({ type: "INITIAL_CART_ITEM", data: firebaseData(cartItem) });
      yield put({
        type: "LOGIN_SUCCESS",
        data: action.data,
      });
    }
  } catch (error) {
    yield put({ type: "LOGIN_FAILED", data: error.message });
  }
}

export function* userSignUpSaga(action) {
  let { email, password } = action.data;

  try {
    let res = yield Auth.createUser(email, password);
    yield put({ type: "SIGN_UP_SUCCESS", data: res.user });
  } catch (error) {
    yield put({ type: "SIGN_UP_FAILED", data: error.message });
  }
}
