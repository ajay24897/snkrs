import React, { useState, useMemo } from "react";
import "./styles.css";

import { Input } from "./billingDetails";

function Payment({ subtotal, userInfo }) {
  const [cardDetails, setCardDetail] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolderName: "",
  });
  const [captcha, setCaptcha] = useState("");
  const [error, setError] = useState({});

  let captchaCode = useMemo(
    () => (Math.random() + 1).toString(36).substring(7).toUpperCase(),
    []
  );

  const { cardNumber, expiryDate, cvv, cardHolderName } = cardDetails;
  const handleInput = (key, value) => {
    setCardDetail({ ...cardDetails, [key]: value });
  };

  const handleClick = () => {
    setError({});
    let errors = {};

    if (!cardNumber.trim()) {
      errors.cardNumber = "Please enter the Card number";
    }
    if (!expiryDate.trim()) {
      errors.expiryDate = "Please enter the Expiry date";
    }
    if (!cvv.trim()) {
      errors.cvv = "Please enter the CVV";
    }
    if (!cardHolderName.trim()) {
      errors.cardHolderName = "Please enter the Card holder's name";
    }

    if (!captcha.trim()) {
      errors.captcha = "Please enter the Captcha";
    } else if (captcha.trim() !== captchaCode) {
      errors.captcha = "Inccorect captcha";
    }
    console.log(errors);
    if (!Object.values(errors)?.length) {
    } else {
      setError(errors);
    }
  };
  return (
    <div id="payment_container">
      {Input(
        "Card Holder's Name",
        true,
        "text",
        "checkout-input",
        cardHolderName,
        (e) => handleInput("cardHolderName", e.target.value)
      )}
      {!!error.cardHolderName && (
        <p className="error_text">{error.cardHolderName}</p>
      )}

      {Input(
        "Card Number",
        true,
        "text",
        "checkout-input",
        cardNumber,
        (e) => {
          handleInput("cardNumber", e.target.value);
        },
        { maxLength: "16" }
      )}
      {!!error.cardNumber && <p className="error_text">{error.cardNumber}</p>}

      <div className="half_width_input">
        <div className="flex1">
          {Input(
            "Expiry Date",
            true,
            "text",
            "checkout-input",
            expiryDate,
            (e) => handleInput("expiryDate", e.target.value.trim()),
            { maxLength: "7", placeHolder: "MM / DD" }
          )}
          {!!error.expiryDate && (
            <p className="error_text">{error.expiryDate}</p>
          )}
        </div>

        <div className="flex1">
          {Input(
            "CVV",
            true,
            "text",
            "checkout-input",
            cvv,
            (e) => handleInput("cvv", e.target.value),
            { placeHolder: "XXX", maxLength: 3 }
          )}
          {!!error.cvv && <p className="error_text">{error.cvv}</p>}
        </div>
      </div>
      {Input("Captcha", true, "text", "checkout-input", captcha, (e) =>
        setCaptcha(e.target.value)
      )}
      {!!error.captcha && <p className="error_text">{error.captcha}</p>}

      <text id="head_captcha">
        {captchaCode?.split().map((char) => (
          <span className="captcha">{char}</span>
        ))}
      </text>

      <h3 id="pay_amount">
        Pay Amount : ${subtotal < 200 ? subtotal + 100 : subtotal}
      </h3>

      <button onClick={handleClick}>Place Order & Download Invoice</button>
    </div>
  );
}

export default Payment;
