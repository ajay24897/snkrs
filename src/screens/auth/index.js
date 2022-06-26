import React, { useState, useEffect } from "react";
import { Auth } from "../../firebase/services/auth.services";
import { auth } from "../../firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";

function Authentication() {
  let [user, setUser] = useState({ email: "" });
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("in 14356");
    });
  }, []);

  const handleClick = async () => {
    try {
      let res = await Auth.createUser(email, password);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickLogIn = async () => {
    console.log("in");
    try {
      let res = await Auth.signIn(email, password);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const signOut = async () => {
    console.log("in");
    Auth.signOut();
    setUser({ email: "" });
  };

  return (
    <div
      style={{
        width: "80%",
        margin: "0 20%",
        flexDirection: "column",
      }}
    >
      {user?.email ?? "no user found"} looged in
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
