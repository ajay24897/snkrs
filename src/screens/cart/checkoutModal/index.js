import React from "react";
import { GrClose } from "react-icons/gr";
import {} from "../../../common/function";
import "./styles.css";

function CheckoutModal({ onCancle, data }) {
  return (
    <div id="checkout-overlay">
      <div id="checkout-modal-container">
        <GrClose id="close_icon" onClick={onCancle} />
        <h3 id="checkout-header">Billing Details</h3>
        <div id="billing-info-container">
          <label>Name</label>
          <input type="text" className="checkout-input" />

          <label>Email</label>
          <input type="text" className="checkout-input" />

          <label>Phone</label>
          <input type="text" className="checkout-input" />
        </div>
      </div>
    </div>
  );
}

export default CheckoutModal;
