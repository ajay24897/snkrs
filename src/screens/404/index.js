import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import route from "../../common/constant/string/route.string";

function NotFound({ heading, title, subtitle, goback }) {
  const navigate = useNavigate();
  return (
    <div id={"page_not_found"}>
      <h1 id="heading">{heading || 404}</h1>
      <h4 id="title">{title || "Page not found"}</h4>
      <h6 id="sub_title">
        {subtitle || "We couldn't find the page you were looking for."}
      </h6>
      <button
        id="home_button"
        onClick={() => {
          goback ? navigate(-1) : navigate(route.home);
        }}
      >
        {goback ? "Back" : "Home"}
      </button>
    </div>
  );
}

export default NotFound;
