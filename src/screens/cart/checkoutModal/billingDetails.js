import React, { useEffect, useState } from "react";

import {
  BIILING_INFO,
  REGEX,
} from "../../../common/constant/string/common.string";
import "./styles.css";

function BillingDetails({ setHasAddress }) {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    state: "",
    country: "",
    landmark: "",
    pincode: "",
  });
  const [error, setError] = useState({});
  const [checked, setChecked] = useState(false);

  const { name, mobile, email, address, state, country, pincode, landmark } =
    userDetails;
  const { validation, inputLabel, buttonText } = BIILING_INFO;

  useEffect(() => {
    if (localStorage.getItem("userInfo"))
      setUserDetails(JSON.parse(localStorage.getItem("userInfo")));

    if (localStorage.getItem("remember")) {
      setChecked(true);
    }
  }, []);

  const handleClick = () => {
    setError({});
    let errors = {};
    if (!name?.trim()) {
      errors.name = validation.name;
    }

    if (!email?.trim()) {
      errors.email = validation.email;
    } else if (!email.trim().match(REGEX.email)) {
      errors.email = validation.vaidEmail;
    }

    if (!mobile?.trim()) {
      errors.mobile = validation.mobile;
    } else if (!mobile.trim().match(REGEX.mobile)) {
      errors.mobile = validation.validMobile;
    }

    if (!address?.trim()) {
      errors.address = validation.address;
    }

    if (!pincode?.trim()) {
      errors.pincode = validation.pincode;
    } else if (!pincode?.trim().match(REGEX.pincode)) {
      errors.pincode = validation.validPinCode;
    }
    if (!state?.trim()) {
      errors.state = validation.state;
    }
    if (!country?.trim()) {
      errors.country = validation.country;
    }

    if (!Object.values(errors)?.length) {
      setHasAddress(userDetails);
      if (checked) {
        localStorage.setItem("userInfo", JSON.stringify(userDetails));
        localStorage.setItem("remember", "true");
      } else {
        localStorage.removeItem("userInfo");
        localStorage.removeItem("remember");
      }
    } else {
      setError(errors);
    }
  };

  const handleInput = (key, value) => {
    setUserDetails({ ...userDetails, [key]: value });
  };

  return (
    <div id="billing-info-container">
      {Input(inputLabel.name, true, "text", "checkout-input", name, (e) =>
        handleInput("name", e.target.value)
      )}
      {!!error.name && <p className="error_text">{error.name}</p>}
      <div className="half_width_input">
        <div className="flex1">
          {Input(inputLabel.email, true, "text", "checkout-input", email, (e) =>
            handleInput("email", e.target.value)
          )}
          {!!error.email && <p className="error_text">{error.email}</p>}
        </div>

        <div className="flex1">
          {Input(
            inputLabel.mobile,
            true,
            "text",
            "checkout-input",
            mobile,
            (e) => handleInput("mobile", e.target.value),
            { maxlength: "10" }
          )}
          {!!error.mobile && <p className="error_text">{error.mobile}</p>}
        </div>
      </div>

      {Input(inputLabel.address, true, "text", "checkout-input", address, (e) =>
        handleInput("address", e.target.value)
      )}
      {!!error.address && <p className="error_text">{error.address}</p>}

      <div className="half_width_input">
        <div className="flex1">
          {Input(inputLabel.state, true, "text", "checkout-input", state, (e) =>
            handleInput("state", e.target.value)
          )}
          {!!error.state && <p className="error_text">{error.state}</p>}
        </div>

        <div className="flex1">
          {Input(
            inputLabel.country,
            true,
            "text",
            "checkout-input",
            country,
            (e) => handleInput("country", e.target.value)
          )}
          {!!error.country && <p className="error_text">{error.country}</p>}
        </div>
      </div>
      <div className="half_width_input">
        <div className="flex1">
          {Input(
            inputLabel.pincode,
            true,
            "text",
            "checkout-input",
            pincode,
            (e) => handleInput("pincode", e.target.value),
            { maxlength: "6" }
          )}
          {!!error.pincode && <p className="error_text">{error.pincode}</p>}
        </div>

        <div className="flex1">
          {Input(
            inputLabel.landmark,
            false,
            "text",
            "checkout-input",
            landmark,
            (e) => handleInput("landmark", e.target.value)
          )}
        </div>
      </div>
      <div>
        <input
          type={"checkbox"}
          checked={checked}
          onChange={() => setChecked((prev) => !prev)}
        />
        {inputLabel.rememberInfo}
      </div>
      <button id="proceed_button" onClick={handleClick}>
        {buttonText.proceed}
      </button>
    </div>
  );
}

export default BillingDetails;

export function Input(
  label,
  isRequired,
  type,
  className,
  value,
  onChange,
  props
) {
  return (
    <>
      {!!label && (
        <label>
          {label} {isRequired && <span style={{ color: "red" }}>*</span>}
        </label>
      )}
      <input
        type={type}
        className={className}
        value={value}
        onChange={onChange}
        {...props}
      />
    </>
  );
}
