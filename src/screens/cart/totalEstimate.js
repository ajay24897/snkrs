import React from "react";
import {
  ESTIMATED_DELIVERY,
  SUMMARY,
  TOTAL,
} from "../../common/constant/string/common.string";
import { ammountInDecimal } from "../../common/function";

function TotalEstimate({ subtotal }) {
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
          ${ammountInDecimal(subtotal < 50 ? 20 : 0)}
        </text>
      </div>
      <div className="bottom_border" />
      <div className="flexRow total_cart_value">
        <h6 className={"cart_text"}>{TOTAL}</h6>
        <h6 className={"cart_text"}>
          ${ammountInDecimal(subtotal < 50 ? subtotal + 20 : subtotal)}
        </h6>
      </div>
      <div className="bottom_border" />
    </>
  );
}

export default TotalEstimate;
