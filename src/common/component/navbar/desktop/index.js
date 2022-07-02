import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsBag } from "react-icons/bs";

import { Auth } from "../../../../firebase/services/auth.services";
import { LOG_OUT, SIGN_UP } from "../../../constant/string/common.string";
import "./style.css";

const navList = [
  {
    route: "Men",
    to: "men",
  },
  {
    route: "Women",
    to: "women",
  },
  {
    route: "Unisex",
    to: "unisex",
  },
];

function DesktopNav() {
  let { hasLoggedIn } = useSelector((state) => state.userAuthReducer);
  const dispatch = useDispatch();

  const logOut = () => {
    Auth.signOut();
    dispatch({ type: "LOG_OUT_REQUEST" });
  };

  return (
    <div id="container">
      <NavLink to={"/"}>
        <img id="logo" src={require("../../../image/logo.png")} alt={"logo"} />
      </NavLink>

      <div id="middle_navelink">
        {navList.map((nav) => {
          return (
            <NavLink
              to={nav.to}
              className={({ isActive }) =>
                isActive ? "navlink active-navlink" : "navlink"
              }
            >
              <text>{nav.route}</text>
            </NavLink>
          );
        })}
      </div>
      <div className="right_navelink">
        {!hasLoggedIn ? (
          <div
            className={"navlink"}
            onClick={() => dispatch({ type: "OPEN_SIGN_UP_FORM" })}
          >
            <text>{SIGN_UP}</text>
          </div>
        ) : (
          <text className="navlink" onClick={logOut}>
            {LOG_OUT}
          </text>
        )}

        <NavLink
          to="cart"
          className={({ isActive }) => (isActive ? "cart active-cart" : "cart")}
        >
          <BsBag size={"2rem"} />
        </NavLink>
      </div>
    </div>
  );
}

export default DesktopNav;
