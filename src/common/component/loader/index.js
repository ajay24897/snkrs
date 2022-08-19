import React from "react";
import PropTypes from "prop-types";

import "./styles.css";

function Loader({ showOverlay, message }) {
  return (
    <div id={`${showOverlay ? "overlay_loader_cnt" : "loader_cnt"}`}>
      <div id="loader-image-wrapper">
        <div className="loader_shoe" id={"shoe_1"} />
        <div className="loader_shoe" id={"shoe_2"} />
      </div>
      {!!message && <text id="loader_message">{message}</text>}
    </div>
  );
}
export default Loader;

Loader.defaultProps = { showOverlay: false, message: null };
Loader.propTypes = { showOverlay: PropTypes.bool, message: PropTypes.string };
