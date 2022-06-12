import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <NavLink to="/">Home</NavLink>
      <NavLink to="men">Men</NavLink>
      <NavLink to="women">Women</NavLink>
      <NavLink to="unisex">Unisex</NavLink>
      <NavLink to="cart">Cart</NavLink>
    </div>
  );
}

export default Navbar;
