import React, { memo } from "react";
import { GrClose } from "react-icons/gr";
import { IoIosWarning } from "react-icons/io";
import PropTypes from "prop-types";
import "./styles.css";

function WarrningModal({ onCancle, onConfirm, title, message }) {
  return (
    <div id="overlay">
      <div id="auth_container">
        <GrClose id="close_icon" onClick={onCancle} />
        <div
          style={{
            alignItems: "center",
          }}
        >
          <IoIosWarning size="6rem" color="#ff0000" />
          <p id="header">{title}</p>
          <p id="message">{message}</p>
        </div>
        <div id="button_container">
          <button id="cancle" onClick={onCancle}>
            Cancle
          </button>
          <button id="confirm" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(WarrningModal);

WarrningModal.defaultProps = {};
WarrningModal.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancle: PropTypes.func.isRequired,
};
