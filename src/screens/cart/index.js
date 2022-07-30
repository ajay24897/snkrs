import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin5Line } from "react-icons/ri";
import Loader from "../../common/component/loader";
import {
  ammountInDecimal,
  capitalizeFirstLetter,
  firebaseData,
  getShoeGenderTitle,
  isLoading,
  removeRrandNameFromTitle,
} from "../../common/function";
import { cartApi } from "../../firebase/services/snkrs.services";

import "./styles.css";
import {
  CHECKOUT,
  ESTIMATED_DELIVERY,
  QUANTITY,
  SIZE,
  SUMMARY,
  TOTAL,
  UK,
} from "../../common/constant/string/common.string";

function Cart() {
  const dispatch = useDispatch();

  const { userDetails } = useSelector((state) => state.userAuthReducer);

  const { data, status, refetch } = useQuery(
    "cart",
    async () => await getCartItems(),
    {
      enabled: false,
    }
  );
  let [subtotal, setSubtotal] = useState(null);

  useEffect(() => {
    if (userDetails?.email) refetch();
  }, [refetch, userDetails]);

  const getCartItems = async () => {
    try {
      const res = await cartApi.getSnkr(userDetails.email);
      const data = firebaseData(res);

      return data;
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    if (data?.length) {
      const initialValue = 0;
      const sumWithInitial = data?.reduce(
        (previousValue, data) =>
          previousValue + data.retailPrice * data.quantity,
        initialValue
      );
      setSubtotal(sumWithInitial);
      dispatch({ type: "INITIAL_CART_ITEM", data });
    }
  }, [data]);

  console.log("data", data, userDetails?.email);

  return (
    <>
      {isLoading(status) && <Loader showOverlay />}
      <div id="cart_main_wrapper">
        <div id="cart_container">
          {data?.length &&
            data?.map((shoe, index) => (
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
                      <text
                        className="cart_text info_margin"
                        id="shoe_gender_type"
                      >
                        {getShoeGenderTitle(shoe.gender)}
                      </text>
                      <div className="flex_wrap">
                        <text className="cart_text info_margin" id="shoe_Size">
                          {SIZE} : {shoe.size} {UK}
                        </text>

                        <text
                          className="cart_text info_margin"
                          id="shoe_quantity"
                        >
                          {QUANTITY} : {shoe.quantity}
                        </text>
                      </div>
                    </div>
                    <div id="shoe_price">
                      <text
                        className="cart_text info_margin"
                        id="shoe_price_text"
                      >
                        ${shoe.retailPrice * shoe.quantity}
                      </text>
                      <RiDeleteBin5Line
                        size={"1.5rem"}
                        color="grey"
                        id="delete_item_icon"
                      />
                    </div>
                  </div>
                </div>

                <div className="bottom_border" />
              </>
            ))}
        </div>

        {data && (
          <div id="summary_details">
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

            <button id="checkout_button">{CHECKOUT}</button>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
