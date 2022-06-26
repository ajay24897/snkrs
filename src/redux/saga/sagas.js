import { Auth } from "../../firebase/services/auth.services";
import { put } from "redux-saga/effects";

function* userLoginSaga(action) {
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
export default userLoginSaga;
