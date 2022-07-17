import React, { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "react-query";

import {
  ADD_TO_CART,
  SELECT_QUANTITY,
  SELECT_SIZE,
  UK,
} from "../../../constant/string/common.string";
import {
  capitalizeFirstLetter,
  getShoeGenderTitle,
  removeRrandNameFromTitle,
} from "../../../function";
import { cartApi } from "../../../../firebase/services/snkrs.services";
import Loader from "../../loader";

const womens = [3, 4, 5, 6, 7, 8];
const mens = [6, 7, 8, 9, 10];

function ProductInfo({ product }) {
  console.log("product", product);
  let { brand, title, retailPrice, gender, colorway } = product;
  const [size, setSize] = useState();
  const [quantity, setQuantity] = useState();
  const [error, setError] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();

  const { isLoading, data, isFetching, refetch } = useQuery(
    "cart",
    async () =>
      await addSnkrInCart({
        user: userDetails?.email,
        shoeId: id,
        size: +size,
        quantity: +quantity,
        media: product?.media,
        retailPrice,
        title,
        colorway,
        brand,
        gender,
      }),
    {
      enabled: false,
    }
  );

  const { userDetails } = useSelector((state) => state.userAuthReducer);

  const addSnkrInCart = async (data) => {
    try {
      let res = await cartApi.addSnkr(data);
      dispatch({ type: "ADDED_IN_CART" });
      return res;
    } catch (error) {
      return error;
    }
  };

  const addToCart = () => {
    setError(null);
    if (!size && !quantity) {
      setError("please select size and quantity");
      return;
    }
    if (!size) {
      setError("please select size");
      return;
    }
    if (!quantity) {
      setError("please select quantity");
      return;
    }

    if (id && size && quantity) {
      refetch();
    }
  };

  return (
    <>
      {isFetching && <Loader showOverlay={true} />}
      <div id="product-info-wrapper">
        <div className="short-product-details">
          <h4 className="brand-name">{capitalizeFirstLetter(brand)}</h4>
          <h6 className="product-name">
            {capitalizeFirstLetter(removeRrandNameFromTitle(title, brand))}
          </h6>
          <p className="text-ellipsis product-name">
            {getShoeGenderTitle(gender)}
          </p>
          <p className=" product-color">Color : {colorway}</p>
          {gender === "men" && (
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className={"select"}
            >
              <option value="" selected>
                {SELECT_SIZE}
              </option>
              {mens.map((data) => {
                return (
                  <option value={data} key={data}>
                    {data} {UK}
                  </option>
                );
              })}
            </select>
          )}
          <select
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className={"select"}
          >
            <option value="" selected>
              {SELECT_QUANTITY}
            </option>
            {[1, 2, 3].map((data) => {
              return (
                <option value={data} key={data}>
                  {data}
                </option>
              );
            })}
          </select>

          <h3 className="text-ellipsis price">
            ${retailPrice < 50 ? 50 : retailPrice}
          </h3>

          <text>{error}</text>
          <button style={{ background: "#000" }} onClick={addToCart}>
            {ADD_TO_CART}
          </button>

          {/* <h1 onClick={async () => await handleDelete(id)}>Delete </h1> */}
        </div>
      </div>
    </>
  );
}

export default memo(ProductInfo);
