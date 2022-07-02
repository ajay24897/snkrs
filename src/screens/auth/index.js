import React, { useState, useEffect } from "react";
import { Auth } from "../../firebase/services/auth.services";
import { useDispatch, useSelector } from "react-redux";
import { GrClose } from "react-icons/gr";

import "./styles.css";
import {
  ALREADY_HAVE_ACCOUNT,
  DONT_HAVE_ACCOUNT,
  Email,
  ENTER_EMAIL,
  ENTER_PASSWORD,
  LOG_IN,
  PASSWORD,
  SIGN_UP,
} from "../../common/constant/string/common.string";

function Authentication() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [hasSignUpForm, setHasSignUpForm] = useState(true);

  const { userDetails, hasError } = useSelector(
    (state) => state.userAuthReducer
  );

  let dispatch = useDispatch();

  useEffect(() => {
    if (userDetails?.email) {
      dispatch({ type: "CLOSE_SIGN_UP_FORM" });
    }
  }, [dispatch, userDetails]);

  useEffect(() => {
    if (hasError) {
      setError(hasError);
    }
  }, [hasError]);

  const handleClick = async () => {
    setError("");
    if (email.trim() === "" && password.trim() === "") {
      setError("Please enter Email and Password");
    } else if (password.trim() === "") {
      setError("Please enter Password");
    } else if (email.trim() === "") {
      setError("Please enter Email");
    } else if (email && password) {
      if (hasSignUpForm) {
        dispatch({ type: "SIGN_UP_REQUEST", data: { email, password } });
      } else {
        dispatch({ type: "LOGIN_REQUEST", data: { email, password } });
      }
    }
  };

  const handleFormChange = () => {
    setError("");
    setEmail("");
    setPassword("");
    setHasSignUpForm((prev) => !prev);
  };

  return (
    <div className="overlay">
      <div className="container">
        <GrClose
          style={{ margin: "1rem 2rem 0 auto" }}
          onClick={() => dispatch({ type: "CLOSE_SIGN_UP_FORM" })}
        />
        {/* {state?.email ?? "no user found"} looged in */}

        <h4 className="form_title">{hasSignUpForm ? "Sign Up" : "Log In"}</h4>
        <div className="form_content">
          <label className="label">{Email}</label>
          <input
            placeholder={ENTER_EMAIL}
            type={"text"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="label">{PASSWORD}</label>
          <input
            type={"password"}
            placeholder={ENTER_PASSWORD}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {hasSignUpForm ? (
            <button onClick={handleClick}>{SIGN_UP}</button>
          ) : (
            <button onClick={handleClick}>{LOG_IN}</button>
          )}
        </div>
        {hasSignUpForm ? (
          <text>
            {ALREADY_HAVE_ACCOUNT}
            <text id={"link"} onClick={handleFormChange}>
              {LOG_IN}
            </text>
          </text>
        ) : (
          <text>
            {DONT_HAVE_ACCOUNT}
            <text id={"link"} onClick={handleFormChange}>
              {SIGN_UP}
            </text>
          </text>
        )}

        {error && <text className="errorText">{error}</text>}
      </div>
    </div>
  );
}

export default Authentication;
