import React from "react";
import {
  ESTIMATED_DELIVERY,
  SUMMARY,
  TOTAL,
} from "../../common/constant/string/common.string";
import { ammountInDecimal } from "../../common/function";

function TotalEstimate({ subtotal }) {
  const MINIMUM_CART_VALUE = 200;
  const DELIVERY_CHARGE = 100;
  return (
    <>
      <h3 className="flexRow total_cart_value" id="summury_header">
        {SUMMARY}
      </h3>
      <div className="bottom_border" />
      <div className="flexRow spacing">
        <text className="cart_text">Subtotal</text>
        <text className="cart_text">${ammountInDecimal(subtotal)}</text>
      </div>
      <div className="flexRow spacing">
        <text className="cart_text">{ESTIMATED_DELIVERY}</text>
        <text className="cart_text">
          $
          {ammountInDecimal(
            subtotal < MINIMUM_CART_VALUE ? DELIVERY_CHARGE : 0
          )}
        </text>
      </div>
      <div className="bottom_border" />
      <div className="flexRow total_cart_value">
        <h6 className={"cart_text"}>{TOTAL}</h6>
        <h6 className={"cart_text"}>
          $
          {ammountInDecimal(
            subtotal < MINIMUM_CART_VALUE
              ? subtotal + DELIVERY_CHARGE
              : subtotal
          )}
        </h6>
      </div>
      <div className="bottom_border" />
    </>
  );
}

export default TotalEstimate;
