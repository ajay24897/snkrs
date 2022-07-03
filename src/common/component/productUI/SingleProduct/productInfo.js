import React, { memo, useState } from "react";
import {
  ADD_TO_CART,
  SELECT_QUANTITY,
  SELECT_SIZE,
  UK,
} from "../../../constant/string/common.string";
import {
  capitalizeFirstLetter,
  removeRrandNameFromTitle,
} from "../../../function";

const womens = [3, 4, 5, 6, 7, 8];
const mens = [6, 7, 8, 9, 10];

function ProductInfo({ product }) {
  let { brand, title, retailPrice, gender, colorway } = product;
  const [size, setSize] = useState();
  const [qnt, setQnt] = useState();

  return (
    <div id="product-info-wrapper">
      <div className="short-product-details">
        <h4 className="brand-name">{capitalizeFirstLetter(brand)}</h4>
        <h6 className="product-name">
          {capitalizeFirstLetter(removeRrandNameFromTitle(title, brand))}
        </h6>
        <p className="text-ellipsis product-name">
          {gender === "men" ? "MENS" : "WMNS"}
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
                <option value={data}>
                  {data} {UK}
                </option>
              );
            })}
          </select>
        )}
        <select
          value={qnt}
          onChange={(e) => setQnt(e.target.value)}
          className={"select"}
        >
          <option value="" selected>
            {SELECT_QUANTITY}
          </option>
          {[1, 2, 3].map((data) => {
            return <option value={data}>{data}</option>;
          })}
        </select>

        <h3 className="text-ellipsis price">
          ${retailPrice < 50 ? 50 : retailPrice}
        </h3>
        <button style={{ background: "#000" }}>{ADD_TO_CART}</button>
        {/* <h1 onClick={async () => await handleDelete(id)}>Delete </h1> */}
      </div>
    </div>
  );
}

export default memo(ProductInfo);
