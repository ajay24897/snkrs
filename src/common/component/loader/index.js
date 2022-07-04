import React from "react";
import "./styles.css";

function Loader({ showOverlay }) {
  return (
    <div className={`${showOverlay ? "overlay-loader-cnt" : "loader-cnt"}`}>
      <div className="shoeLogo shoe1" />
      <div className="shoeLogo shoe2" />
    </div>
  );
}
export default Loader;
