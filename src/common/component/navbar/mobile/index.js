import React, { useState, useEffect } from "react";
import { BsBag } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import "./style.css";
import { LOG_OUT, SIGN_UP } from "../../../constant/string/common.string";
import { Auth } from "../../../../firebase/services/auth.services";

const navbarItems = [
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
function MobileNavigation() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isRotate, setRotate] = useState(false);
  const [isRotateCross, setRotateCross] = useState(false);
  const { totalItems } = useSelector((state) => state.cartDetailsReducer);
  const { hasLoggedIn } = useSelector((state) => state.userAuthReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    setRotate(false);
  }, [isRotateCross]);

  useEffect(() => {
    setRotateCross(false);
  }, [isRotate]);

  const handelRotateHam = () => {
    setMenuOpen(!isMenuOpen);
    setRotate(true);
  };

  const handelRotateBar = () => {
    setMenuOpen(!isMenuOpen);
    setRotateCross(true);
  };

  const handleLogOut = () => {
    Auth.signOut();
    dispatch({ type: "LOG_OUT_REQUEST" });
    dispatch({ type: "CLEAR_CART_ITEM" });
  };

  const handleSignUpClick = () => dispatch({ type: "OPEN_SIGN_UP_FORM" });

  return (
    <>
      <div id="mob-container">
        <NavLink to={"/snkrs"} onClick={() => setMenuOpen(false)}>
          <img
            id="logo"
            src={require("../../../image/logo.png")}
            alt={"logo"}
          />
        </NavLink>

        <div className="container">
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
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              isActive ? "cart active-cart" : "cart"
            }
          >
            <text id="cart-value">{totalItems}</text>
            <BsBag size={"2rem"} />
          </NavLink>
          <div
            className={`navlink zIndex ${isRotateCross ? "rotate" : "menu"}`}
          >
            {isMenuOpen ? (
              <GrClose size={"2.2rem"} onClick={handelRotateHam} />
            ) : (
              <GiHamburgerMenu size={"2.2rem"} onClick={handelRotateBar} />
            )}
          </div>
        </div>
      </div>
      <SideMenu isOpen={isMenuOpen}>
        {navbarItems.map((item, index) => {
          return (
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                isActive ? "navlink active" : "navlink"
              }
              key={index}
              onClick={handelRotateHam}
            >
              {item.route}
            </NavLink>
          );
        })}
      </SideMenu>
    </>
  );
}

export default MobileNavigation;
MobileNavigation.defaultProps = {};
MobileNavigation.propTypes = {};

export const SideMenu = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: flex;
    height: 100vh;
    width: 100%;
    background: #f2f2f2;
    z-index: 30;
    flex-direction: column;
    align-items: center;
    position: absolute;
    right: 0;
    top: 0;
    overflow: hidden;
    clip-path: ${(props) =>
      props.isOpen === true
        ? "circle(150vh at 100% -0%)"
        : "circle(0px at 100% -0%)"};
    transition: all 1s ease-in-out;

    .navlink {
      font-size: 1.5rem;
      font-weight: 600;
      text-decoration: none;
      color: #000;
      transition: all 0.5s ease-in;
    }
    .active {
      text-decoration: underline;
      text-decoration-color: grey;
      text-underline-offset: 1rem;
    }
    .cart {
      text-decoration: none;
      color: #000;
      position: relative;
    }
    .active-cart {
      color: grey;
    }
  }
`;
