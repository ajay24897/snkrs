import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsBag } from "react-icons/bs";
import "./style.css";

import { Auth } from "../../../../firebase/services/auth.services";

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

      <div id="links">
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {!hasLoggedIn ? (
          <NavLink
            to="authentication"
            className={({ isActive }) =>
              isActive ? "navlink active-navlink" : "navlink"
            }
          >
            <text>Sign up</text>
          </NavLink>
        ) : (
          <NavLink
            className={({ isActive }) =>
              isActive ? "navlink active-navlink" : "navlink"
            }
            to="/"
            onClick={logOut}
          >
            <text>Log out</text>
          </NavLink>
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
