import React, { memo, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "react-query";

import {
  ADD_TO_CART,
  SELECT_QUANTITY,
  SELECT_SIZE,
  UK,
  PLEASE_SIGN_UP_OR_LOGIN,
  PLEASE_SELECT_SIZE,
  PLEASE_SELECT_SIZE_AND_QUANTITY,
  PLEASE_SELECT_QUANTITY,
  PRODUCT_ADDED_SUCCESSFULLY,
} from "../../../constant/string/common.string";
import {
  capitalizeFirstLetter,
  getShoeGenderTitle,
  isSuccess,
  removeRrandNameFromTitle,
} from "../../../function";
import { cartApi } from "../../../../firebase/services/snkrs.services";
import Loader from "../../loader";
import { MdDownloadForOffline } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import { WhatsappShareButton, WhatsappIcon } from "react-share";

function ProductInfo({ product, sizes }) {
  let { brand, title, retailPrice, gender, colorway } = product;
  const [size, setSize] = useState();
  const [quantity, setQuantity] = useState();
  const [error, setError] = useState(null);
  const [hasClickedToCart, setHasClickedToCart] = useState(false);

  const { id } = useParams();
  const dispatch = useDispatch();

  const { isFetching, refetch, status } = useQuery(
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

  useMemo(() => {
    if (isSuccess(status) && hasClickedToCart) {
      toast.success(PRODUCT_ADDED_SUCCESSFULLY);
      setHasClickedToCart(false);
    }
  }, [hasClickedToCart, status]);

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
      setError(PLEASE_SELECT_SIZE_AND_QUANTITY);
      return;
    }
    if (!size) {
      setError(PLEASE_SELECT_SIZE);
      return;
    }
    if (!quantity) {
      setError(PLEASE_SELECT_QUANTITY);
    }

    if (!userDetails?.email) {
      toast.warn(PLEASE_SIGN_UP_OR_LOGIN);
      return;
    }

    if (id && size && quantity) {
      refetch();
      setHasClickedToCart(true);
    }
  };

  return (
    <>
      {
        <ToastContainer
          position="top-center"
          closeButton={true}
          closeOnClick
          pauseOnHover
          autoClose={2000}
          limit={3}
        />
      }
      {isFetching && <Loader showOverlay={true} />}
      <div id="product-info-wrapper">
        <div className="short-product-details">
          <h4 className="brand-name">{capitalizeFirstLetter(brand)}</h4>
          <h6 className="product-name">
            {capitalizeFirstLetter(removeRrandNameFromTitle(title, brand))}
          </h6>
          <p className="product-color grey_text">Color : {colorway}</p>
          <p className="text-ellipsis grey_text">
            {getShoeGenderTitle(gender)}
          </p>
          {
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className={"select"}
            >
              <option value="" defaultValue>
                {SELECT_SIZE}
              </option>
              {sizes.map((data) => {
                return (
                  <option value={data} key={data}>
                    {data} {UK}
                  </option>
                );
              })}
            </select>
          }
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
          <h3 className="text-ellipsis price">${retailPrice}</h3>

          <button id="add_to_cart_button" onClick={addToCart}>
            {ADD_TO_CART}
          </button>
          <div id="download-button">
            <WhatsappShareButton
              url={window.location.href}
              id="whatsapp-button"
            >
              <WhatsappIcon size={27} round={true} />
            </WhatsappShareButton>
            <a download={product.title + ".webp"} href={product?.media}>
              <MdDownloadForOffline color="#000" size={30} />
            </a>
          </div>

          <text id="error_text">{error}</text>
        </div>
      </div>
    </>
  );
}

export default memo(ProductInfo);
