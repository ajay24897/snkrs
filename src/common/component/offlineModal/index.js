import React from "react";
import { IoMdRocket } from "react-icons/io";
import "./styles.css";

function OfflineModal() {
  return (
    <div id="offline_overlay">
      <div id="offline_container">
        <IoMdRocket size={"100px"} id="rocket" color="grey" />
        <h1 id="no_internet">No Internet</h1>
        <h4 id="sub_title">It seems you are offline </h4>
      </div>
    </div>
  );
}

export default OfflineModal;
