import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsBag } from "react-icons/bs";

import { Auth } from "../../../../firebase/services/auth.services";
import { LOG_OUT, SIGN_UP } from "../../../constant/string/common.string";
import "./style.css";

function DesktopNavigation() {
  let { hasLoggedIn } = useSelector((state) => state.userAuthReducer);
  let { totalItems } = useSelector((state) => state.cartDetailsReducer);

  const dispatch = useDispatch();
  const handleSignUpClick = () => dispatch({ type: "OPEN_SIGN_UP_FORM" });

  const handleLogOut = () => {
    Auth.signOut();
    dispatch({ type: "LOG_OUT_REQUEST" });
    dispatch({ type: "CLEAR_CART_ITEM" });
  };

  return (
    <div id="container">
      <NavLink to={"/snkrs"}>
        <img id="logo" src={require("../../../image/logo.png")} alt={"logo"} />
      </NavLink>

      <div id="middle_navelink">
        {navbarItems.map((navigate) => {
          return (
            <NavLink
              to={navigate.to}
              className={({ isActive }) =>
                isActive ? "navlink active-navlink" : "navlink"
              }
              key={navigate.to}
            >
              <text>{navigate.route}</text>
            </NavLink>
          );
        })}
      </div>
      <div className="right_navelink">
        {!hasLoggedIn ? (
          <div className={"navlink"} onClick={handleSignUpClick}>
            <text>{SIGN_UP}</text>
          </div>
        ) : (
          <text className="navlink" onClick={handleLogOut}>
            {LOG_OUT}
          </text>
        )}

        <NavLink
          to="cart"
          className={({ isActive }) => (isActive ? "cart active-cart" : "cart")}
        >
          <text id={"cart-value"}>{totalItems}</text>
          <BsBag size={"2rem"} />
        </NavLink>
      </div>
    </div>
  );
}

export default DesktopNavigation;
DesktopNavigation.defaultProps = {};
DesktopNavigation.propTypes = {};

const navbarItems = [
  {
    route: "Men",
    to: "snkrs/men",
  },
  {
    route: "Women",
    to: "snkrs/women",
  },
  {
    route: "Unisex",
    to: "snkrs/unisex",
  },
];
