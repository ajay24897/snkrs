import React, { useEffect, useMemo, useState } from "react";
import { isError, useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../common/component/loader";
import { firebaseData, isLoading, isSuccess } from "../../common/function";
import { cartApi } from "../../firebase/services/snkrs.services";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

import "./styles.css";
import {
  CHECKOUT,
  DELET_CART_ITEM_MESSAGE,
  DELET_CART_ITEM_TITLE,
  PRODUCT_REMOVED_FROM_CART,
} from "../../common/constant/string/common.string";
import WarrningModal from "../../common/component/warningModal";
import CartProduct from "./cartProduct";
import TotalEstimate from "./totalEstimate";
import { BsBag } from "react-icons/bs";

function Cart() {
  const dispatch = useDispatch();
  const [showWarrning, setShowWarrning] = useState(false);
  const [deleteShoeId, setDeleteShoeId] = useState();
  const [subtotal, setSubtotal] = useState(null);

  const { userDetails } = useSelector((state) => state.userAuthReducer);

  const { data, status, refetch } = useQuery("cart", () => getCartItems(), {
    enabled: false,
  });

  const {
    dataUpdatedAt,
    status: deleteStatus,
    refetch: deleteCartItemApi,
  } = useQuery("delete-cart-item", () => cartApi.deleteSnkr(deleteShoeId), {
    enabled: false,
  });

  useEffect(() => {
    if (userDetails?.email) refetch();
  }, [refetch, userDetails]);

  useMemo(() => {
    if (isSuccess(deleteStatus) && deleteShoeId && dataUpdatedAt) {
      closeWarningMoadel();
      setDeleteShoeId();
      toast.success(PRODUCT_REMOVED_FROM_CART);
      refetch();
    }
  }, [dataUpdatedAt]);

  const getCartItems = async () => {
    try {
      const res = await cartApi.getSnkr(userDetails.email);
      return firebaseData(res);
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
    } else {
      dispatch({ type: "INITIAL_CART_ITEM", data: [] });
    }
  }, [data]);

  const handleDelete = (id) => {
    setShowWarrning(true);
    setDeleteShoeId(id);
  };
  const deleteItemFromCart = () => {
    deleteCartItemApi();
  };

  function closeWarningMoadel() {
    setShowWarrning(false);
  }
  return (
    <>
      <ToastContainer
        position="top-center"
        closeButton={true}
        closeOnClick
        pauseOnHover
        autoClose={2000}
        limit={3}
      />

      {(isLoading(status) || isLoading(deleteStatus)) && <Loader showOverlay />}
      {showWarrning && (
        <WarrningModal
          onCancle={closeWarningMoadel}
          title={DELET_CART_ITEM_TITLE}
          message={DELET_CART_ITEM_MESSAGE}
          onConfirm={deleteItemFromCart}
        />
      )}
      <div id="cart_main_wrapper">
        <div id="cart_container">
          {!!data?.length &&
            data?.map((shoe) => (
              <CartProduct
                shoe={shoe}
                onClick={() => handleDelete(shoe.id)}
                key={shoe.id}
              />
            ))}
        </div>

        {!!data?.length && (
          <div id="summary_details">
            <TotalEstimate subtotal={subtotal} />
            <button id="checkout_button">{CHECKOUT}</button>
          </div>
        )}
      </div>
      {!data?.length && (
        <div id="empty_cart">
          <img
            id="empty_cart_image"
            src={require("../../common/image/empty cart.png")}
            alt={"logo"}
          />
          <p id="empty_header">Your cart is empty !</p>
          <p id="empty_message">
            Looks like you heavn't added anything to your cart
          </p>
        </div>
      )}
    </>
  );
}

export default Cart;
