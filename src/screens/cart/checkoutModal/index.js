import React, { useState } from "react";
import { GrClose } from "react-icons/gr";
import BillingDetails from "./billingDetails";
import Payment from "./payment";
import "./styles.css";

function CheckoutModal({ onCancle, subtotal, data, refetch }) {
  const [hasAddress, setHasAddress] = useState(false);

  return (
    <div id="checkout-overlay">
      <div id="checkout-modal-container">
        <GrClose id="close_icon" onClick={onCancle} />
        <h3 id="checkout-header">Billing Details</h3>
        <div
          style={{
            transform: hasAddress ? "translateX(-52%)" : "translateX(0.5%)",
          }}
          id="main"
          className="containerSwipe"
        >
          <BillingDetails setHasAddress={setHasAddress} />
          {hasAddress && (
            <Payment
              subtotal={subtotal}
              userInfo={hasAddress}
              data={data}
              onCancle={onCancle}
              refetch={refetch}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default CheckoutModal;
