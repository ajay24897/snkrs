import React, { useState, useEffect } from "react";
import { BsBag } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
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
function MobileNavigation() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isRotate, setRotate] = useState(false);
  const [isRotateCross, setRotateCross] = useState(false);

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

  return (
    <>
      <div id="mob-container">
        <NavLink to={"/"} onClick={() => setMenuOpen(false)}>
          <img
            id="logo"
            src={require("../../../image/logo.png")}
            alt={"logo"}
          />
        </NavLink>

        <div className="container">
          <NavLink
            to="cart"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              isActive ? "cart active-cart" : "cart"
            }
          >
            <BsBag size={"2rem"} />
          </NavLink>
          {isMenuOpen ? (
            <div
              className={`navlink zIndex ${isRotateCross ? "rotate" : "menu"}`}
            >
              <GrClose size={"2.2rem"} onClick={() => handelRotateHam()} />
            </div>
          ) : (
            <div className={`navlink zIndex ${isRotate ? "rotate" : "menu"}`}>
              <GiHamburgerMenu
                size={"2.2rem"}
                onClick={() => handelRotateBar()}
              />
            </div>
          )}
        </div>
      </div>
      <SideMenu isOpen={isMenuOpen}>
        {navList.map((item, index) => {
          return (
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                isActive ? "navlink active" : "navlink"
              }
              key={index}
              onClick={() => setMenuOpen(!isMenuOpen)}
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
    /* left: ${(props) => (props.isOpen === true ? 0 : "100%")};
    right: ${(props) => (props.isOpen === true ? 0 : "-100%")}; */
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
