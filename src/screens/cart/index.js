import { async } from "@firebase/util";
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

function Cart() {
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
    refetch();
  }, [userDetails?.email]);

  const getCartItems = async () => {
    try {
      let res = await cartApi.getSnkr(userDetails.email);
      console.log("res", res);
      return firebaseData(res);
    } catch (error) {
      return error;
    }
  };
  useEffect(() => {
    if (data?.length) {
      const initialValue = 0;
      const sumWithInitial = data?.reduce(
        (previousValue, data) => previousValue + data.retailPrice,
        initialValue
      );
      setSubtotal(sumWithInitial);
      console.log(sumWithInitial);
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
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                        }}
                      >
                        <text className="cart_text info_margin" id="shoe_Size">
                          Size : {shoe.size} UK
                        </text>

                        <text className="cart_text info_margin">
                          Quantity : {shoe.quantity}
                        </text>
                      </div>
                    </div>
                    <div id="shoe_price">
                      <text
                        className="cart_text info_margin"
                        id="shoe_price_text"
                      >
                        ${shoe.retailPrice}
                      </text>
                      <RiDeleteBin5Line
                        size={"1.5rem"}
                        color="grey"
                        id="delete_item_icon"
                      />
                    </div>
                  </div>
                </div>
              </>
            ))}
        </div>

        {data && (
          <div id="summary_details">
            <h3
              style={{ fontWeight: "lighter" }}
              className="flexRow total_cart_value"
              id="summury_header"
            >
              Summary
            </h3>
            <div className="bottom_border" />
            <div className="flexRow spacing">
              <text className="cart_text">Subtotal</text>
              <text className="cart_text">${ammountInDecimal(subtotal)}</text>
            </div>
            <div className="flexRow spacing">
              <text className="cart_text">Estimated Delivery</text>
              <text className="cart_text">
                ${ammountInDecimal(subtotal < 50 ? 20 : 0)}
              </text>
            </div>
            <div className="bottom_border" />
            <div className="flexRow total_cart_value">
              <h6 className={"cart_text"}>Total</h6>
              <h6 className={"cart_text"}>
                ${ammountInDecimal(subtotal < 50 ? subtotal + 20 : subtotal)}
              </h6>
            </div>
            <div className="bottom_border" />

            <button
              style={{
                background: "black",
                paddingTop: "1.4rem",
                paddingBottom: "1.4rem",
                borderRadius: "3rem",
                marginTop: "2rem",
                fontSize: "1.4rem",
                width: "100%",
              }}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
