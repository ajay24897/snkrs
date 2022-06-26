import React, { useState, useEffect } from "react";
import { Auth } from "../../firebase/services/auth.services";
import { useDispatch, useSelector } from "react-redux";

function Authentication() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let state = useSelector((state) => state.userAuthReducer.userDetails);

  useEffect(() => {
    console.log("state", state);
  }, [state]);

  let dispatch = useDispatch();

  const handleClick = async () => {
    try {
      let res = await Auth.createUser(email, password);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickLogIn = async () => {
    dispatch({ type: "LOGIN_REQUEST", data: { email, password } });
  };
  const signOut = async () => {
    Auth.signOut();
    dispatch({ type: "LOG_OUT_REQUEST" });
  };

  return (
    <div
      style={{
        width: "80%",
        margin: "0 20%",
        flexDirection: "column",
      }}
    >
      {state?.email ?? "no user found"} looged in
      <h4>sign up</h4>
      <label>Email</label>
      <input
        type={"text"}
        style={{ width: "50%" }}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>password</label>
      <input
        type={"password"}
        style={{ width: "50%" }}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleClick} style={{ background: "black" }}>
        Sign up
      </button>
      <h4>Log in</h4>
      <label>Email</label>
      <input
        type={"text"}
        style={{ width: "50%" }}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>password</label>
      <input
        type={"password"}
        style={{ width: "50%" }}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleClickLogIn} style={{ background: "black" }}>
        Log in
      </button>
      <h4>Log out</h4>
      <button style={{ background: "black" }} onClick={signOut}>
        log out
      </button>
    </div>
  );
}

export default Authentication;
