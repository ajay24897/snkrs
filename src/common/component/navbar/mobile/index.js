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

        <div style={{ display: "flex" }}>
          <NavLink
            to="cart"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              isActive ? "cart active-cart" : "cart"
            }
          >
            <BsBag size={"2.5rem"} />
          </NavLink>
          {isMenuOpen ? (
            <div className={`navlink zIndex ${isRotateCross ? "rotate" : ""}`}>
              <GrClose size={"2.5rem"} onClick={() => handelRotateHam()} />
            </div>
          ) : (
            <div className={`navlink zIndex ${isRotate ? "rotate" : ""}`}>
              <GiHamburgerMenu
                size={"2.5rem"}
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
              activeClassName="active"
              className="navlink"
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

  @media screen and (max-width: 767px) {
    display: flex;
    height: 100%;
    width: 100%;
    background: #f2f2f2;
    z-index: 30;
    flex-direction: column;
    align-items: center;
    position: absolute;
    right: 0;
    top: 0;
    /* left: ${(props) => (props.isOpen === true ? 0 : "100%")};
    right: ${(props) => (props.isOpen === true ? 0 : "-100%")}; */
    clip-path: ${(props) =>
      props.isOpen === true
        ? "circle(2000px at 90% -25%)"
        : "circle(0px at 90% -25%)"};
    position: fixed;
    transition: ${(props) =>
      props.isOpen === true ? "all .5s ease-in-out" : "all 0.7s ease-in-out"};

    .navlink {
      font-size: 3rem;
      text-decoration: none;
      color: #000;
      padding: 0rem 2rem;
      height: 100%;
      transition: all 0.5s ease-in;
    }
    .active-navlink {
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
