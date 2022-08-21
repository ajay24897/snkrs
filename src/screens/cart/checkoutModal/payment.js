import React, { useState, useEffect, useMemo } from "react";
import "./styles.css";

import { Input } from "./billingDetails";

function Payment() {
  const [cardDetails, setCardDetail] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolderName: "",
  });
  let captchaCode = useMemo(
    () => (Math.random() + 1).toString(36).substring(7).toUpperCase(),
    []
  );

  const [captcha, setCaptcha] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { cardNumber, expiryDate, cvv, cardHolderName } = cardDetails;
  const handleInput = (key, value) => {
    setCardDetail({ ...cardDetails, [key]: value });
  };
  return (
    <div id="payment_container">
      {Input(
        "Card Holder Name",
        true,
        "text",
        "checkout-input",
        cardHolderName,
        (e) => handleInput("cardHolderName", e.target.value)
      )}

      {Input(
        "Card Number",
        true,
        "text",
        "checkout-input",
        cardNumber,
        (e) => handleInput("cardNumber", e.target.value),
        { maxlength: "19" }
      )}

      <div className="half_width_input">
        <div className="flex1">
          {Input(
            "Expiry Date",
            true,
            "text",
            "checkout-input",
            expiryDate,
            (e) => handleInput("expiryDate", e.target.value)
          )}
        </div>
        <div className="flex1">
          {Input("CVV", true, "text", "checkout-input", cvv, (e) =>
            handleInput("cvv", e.target.value)
          )}
        </div>
      </div>
      {Input("Captcha", true, "text", "checkout-input", captcha, (e) =>
        setCaptcha(e.target.value)
      )}

      <text id="head_captcha">
        {captchaCode?.split().map((char) => (
          <span className="captcha">{char}</span>
        ))}
      </text>
      <button>Make Payment & Place Order</button>
    </div>
  );
}

export default Payment;
