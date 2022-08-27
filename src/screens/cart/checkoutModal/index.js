import React, { useState } from "react";
import { GrClose } from "react-icons/gr";
import BillingDetails from "./billingDetails";
import Payment from "./payment";
import "./styles.css";

function CheckoutModal({ onCancle, subtotal, data }) {
  const [hasAddress, setHasAddress] = useState(false);

  console.log(data);
  return (
    <div id="checkout-overlay">
      <div id="checkout-modal-container">
        <GrClose id="close_icon" onClick={onCancle} />
        <h3 id="checkout-header">Billing Details</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            overflowX: "hidden",
            gap: "2rem",
            width: "200%",
            transform: hasAddress ? "translateX(-51%)" : "translateX(1%)",
            transition: "all 2s",
          }}
          id="main"
        >
          <BillingDetails setHasAddress={setHasAddress} />
          {hasAddress && (
            <Payment subtotal={subtotal} userInfo={hasAddress} data={data} />
          )}
        </div>
      </div>
    </div>
  );
}

export default CheckoutModal;
