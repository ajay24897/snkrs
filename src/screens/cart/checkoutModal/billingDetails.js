import React, { useEffect, useState } from "react";
import "./styles.css";

function BillingDetails({ setHasAddress }) {
  console.log("data");
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
      errors.name = "Please enter the Name";
    }

    if (!email?.trim()) {
      errors.email = "Please enter the Email";
    } else if (
      !email
        .trim()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      errors.email = "Please enter the valid Email";
    }

    if (!mobile?.trim()) {
      errors.mobile = "Please enter the Mobile number";
    } else if (!mobile.trim().match(/^[7-9][0-9]{9}$/)) {
      errors.mobile = "Please enter valid Mobile number";
    }

    if (!address?.trim()) {
      errors.address = "Please enter the Address";
    }

    if (!pincode?.trim()) {
      errors.pincode = "Please enter the Pin code";
    } else if (!pincode?.trim().match(/^[0-9]{6}$/)) {
      errors.pincode = "Please enter the valid Pin code";
    }
    if (!state?.trim()) {
      errors.state = "Please enter the State";
    }
    if (!country?.trim()) {
      errors.country = "Please enter the Country";
    }
    if (!address?.trim()) {
      errors.landmark = "Please enter the Address";
    }
    if (!Object.values(errors)?.length) {
      console.log("every thing is fine");
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
      {Input("Name", true, "text", "checkout-input", name, (e) =>
        handleInput("name", e.target.value)
      )}
      {!!error.name && <p className="error_text">{error.name}</p>}
      <div className="half_width_input">
        <div className="flex1">
          {Input("Email", true, "text", "checkout-input", email, (e) =>
            handleInput("email", e.target.value)
          )}
          {!!error.email && <p className="error_text">{error.email}</p>}
        </div>

        <div className="flex1">
          {Input(
            "Mobile Number",
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

      {Input("Address", true, "text", "checkout-input", address, (e) =>
        handleInput("address", e.target.value)
      )}
      {!!error.address && <p className="error_text">{error.address}</p>}

      <div className="half_width_input">
        <div className="flex1">
          {Input("State", true, "text", "checkout-input", state, (e) =>
            handleInput("state", e.target.value)
          )}
          {!!error.state && <p className="error_text">{error.state}</p>}
        </div>

        <div className="flex1">
          {Input("Country", true, "text", "checkout-input", country, (e) =>
            handleInput("country", e.target.value)
          )}
          {!!error.country && <p className="error_text">{error.country}</p>}
        </div>
      </div>
      <div className="half_width_input">
        <div className="flex1">
          {Input(
            "Pin code",
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
          {Input("Landmark", false, "text", "checkout-input", landmark, (e) =>
            handleInput("landmark", e.target.value)
          )}
        </div>
      </div>
      <div>
        <input
          type={"checkbox"}
          checked={checked}
          onChange={() => setChecked((prev) => !prev)}
        />
        Remember information
      </div>
      <button id="proceed_button" onClick={handleClick}>
        Proceed with the payment
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
