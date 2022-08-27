import React, { useState, useMemo } from "react";
import "./styles.css";

import { Input } from "./billingDetails";
import { cartApi } from "../../../firebase/services/snkrs.services";

import { toast } from "react-toastify";
import { PAYMENT } from "../../../common/constant/string/common.string";

function Payment({ subtotal, userInfo, data }) {
  const [cardDetails, setCardDetail] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolderName: "",
  });
  const [error, setError] = useState({});

  let captchaCode = useMemo(
    () => (Math.random() + 1).toString(36).substring(7).toUpperCase(),
    []
  );

  const [captcha, setCaptcha] = useState(captchaCode);

  const { cardNumber, expiryDate, cvv, cardHolderName } = cardDetails;
  const handleInput = (key, value) => {
    setCardDetail({ ...cardDetails, [key]: value });
  };

  const handleClick = async () => {
    setError({});
    let errors = {};

    if (!cardNumber.trim()) {
      errors.cardNumber = PAYMENT.validation.cardNumber;
    }
    if (!expiryDate.trim()) {
      errors.expiryDate = PAYMENT.validation.expiryDate;
    }
    if (!cvv.trim()) {
      errors.cvv = PAYMENT.validation.cvv;
    }
    if (!cardHolderName.trim()) {
      errors.cardHolderName = PAYMENT.validation.cardHoldersName;
    }

    if (!captcha.trim()) {
      errors.captcha = PAYMENT.validation.captcha;
    } else if (captcha.trim() !== captchaCode) {
      errors.captcha = PAYMENT.validation.inccorectCaptcha;
    }
    if (!Object.values(errors)?.length) {
      await placeOrder();
    } else {
      setError(errors);
    }
  };
  const deleteSnk = async (id) => {
    try {
      cartApi.deleteSnkr(id);
    } catch (err) {
      console.log(err);
    }
  };

  const placeOrder = async () => {
    await data.map(({ id }) => deleteSnk(id));
    toast.success(PAYMENT.toast.orderPlacedSuccessfully);
    setTimeout(() => {
      window.location.reload();
    }, 4000);
  };

  return (
    <>
      <div id="payment_container">
        {Input(
          PAYMENT.inputLabel.cardHoldersName,
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
          PAYMENT.inputLabel.cardNumber,
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
              PAYMENT.inputLabel.expiryDate,
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
              PAYMENT.inputLabel.cvv,
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
        {Input(
          PAYMENT.inputLabel.captcha,
          true,
          "text",
          "checkout-input",
          captcha,
          (e) => setCaptcha(e.target.value)
        )}
        {!!error.captcha && <p className="error_text">{error.captcha}</p>}

        <text id="head_captcha">
          {captchaCode?.split().map((char) => (
            <span className="captcha">{char}</span>
          ))}
        </text>

        <h3 id="pay_amount">
          {PAYMENT.common.payAmount} : $
          {subtotal < 200 ? subtotal + 100 : subtotal}
        </h3>

        <button onClick={handleClick}>{PAYMENT.common.placeOrder}</button>
      </div>
    </>
  );
}

export default Payment;
