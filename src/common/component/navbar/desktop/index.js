import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BsBag } from "react-icons/bs";
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
  const navigate = useNavigate();
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
        <NavLink
          to="authentication"
          className={({ isActive }) =>
            isActive ? "navlink active-navlink" : "navlink"
          }
        >
          <text onClick={() => navigate("/authentication")}>Sign up</text>
        </NavLink>

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
