import React, { memo } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { QUANTITY, SIZE, UK } from "../../common/constant/string/common.string";
import {
  capitalizeFirstLetter,
  getShoeGenderTitle,
  removeRrandNameFromTitle,
} from "../../common/function";
import "./styles.css";

function CartProduct({ shoe, onClick }) {
  console.log("shoe", shoe);
  return (
    <>
      <div id="cart_shoe_info_cnt">
        <img src={shoe.media} id="cart_shoe_image" alt="ww" />
        <div id="cart_shoe_info">
          <div id="card_shoe_info">
            <text className="cart_text info_margin" id="brand_name">
              {capitalizeFirstLetter(shoe.brand)}
            </text>
            <text className="cart_text info_margin" id="shoe_title">
              {capitalizeFirstLetter(
                removeRrandNameFromTitle(shoe.title, shoe.brand)
              )}
            </text>
            <text className="cart_text info_margin" id="shoe_gender_type">
              {getShoeGenderTitle(shoe.gender)}
            </text>
            <div className="flex_wrap">
              <text className="cart_text info_margin" id="shoe_Size">
                {SIZE} : {shoe.size} {UK}
              </text>

              <text className="cart_text info_margin" id="shoe_quantity">
                {QUANTITY} : {shoe.quantity}
              </text>
            </div>
          </div>
          <div id="shoe_price">
            <text className="cart_text info_margin" id="shoe_price_text">
              ${shoe.retailPrice * shoe.quantity}
            </text>
            <RiDeleteBin5Line
              size={"1.5rem"}
              color="grey"
              id="delete_item_icon"
              onClick={onClick}
            />
          </div>
        </div>
      </div>

      <div className="bottom_border" />
    </>
  );
}

export default memo(CartProduct);
