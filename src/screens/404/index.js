import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import route from "../../common/constant/string/route.string";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div id={"page_not_found"}>
      <h1 id="heading">404</h1>
      <h4 id="title">Page not found</h4>
      <h6 id="sub_title">We can't find the page you are looking for.</h6>
      <button id="home_button" onClick={() => navigate(route.home)}>
        Home
      </button>
    </div>
  );
}

export default NotFound;
