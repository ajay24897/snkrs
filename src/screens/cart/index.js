import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
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
  LOOKS_HAVENOT_ADDED_ANYTING,
  PRODUCT_REMOVED_FROM_CART,
  YOU_CART_IS_EMPTY,
} from "../../common/constant/string/common.string";
import WarrningModal from "./warningModal/index";
import CartProduct from "./cartProduct";
import TotalEstimate from "./totalEstimate";
import CheckoutModal from "./checkoutModal";

function Cart() {
  const dispatch = useDispatch();
  const [showWarrning, setShowWarrning] = useState(false);
  const [deleteShoeId, setDeleteShoeId] = useState();
  const [subtotal, setSubtotal] = useState(null);
  const [useLoggedOut, setUserLoggedOut] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

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
    if (userDetails?.email) {
      refetch();
      setUserLoggedOut(false);

      return;
    }
    setUserLoggedOut(true);
    dispatch({ type: "INITIAL_CART_ITEM", data: [] });
  }, [refetch, userDetails]);

  useMemo(() => {
    if (isSuccess(deleteStatus) && deleteShoeId && dataUpdatedAt) {
      closeWarningModal();
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

  function closeWarningModal() {
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
          onCancle={closeWarningModal}
          title={DELET_CART_ITEM_TITLE}
          message={DELET_CART_ITEM_MESSAGE}
          onConfirm={deleteItemFromCart}
        />
      )}

      {!!data?.length && !useLoggedOut && (
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
          <div id="summary_details">
            <TotalEstimate subtotal={subtotal} />
            <button
              id="checkout_button"
              onClick={() => setShowCheckoutModal(true)}
            >
              {CHECKOUT}
            </button>
          </div>
        </div>
      )}
      {showCheckoutModal && (
        <CheckoutModal
          data={data}
          onCancle={() => setShowCheckoutModal(false)}
          subtotal={subtotal}
        />
      )}

      {(!data?.length || useLoggedOut) && !isLoading(status) && (
        <div id="empty_cart">
          <img
            id="empty_cart_image"
            src={require("../../common/image/empty cart.png")}
            alt={"logo"}
          />
          <p id="empty_header">{YOU_CART_IS_EMPTY}</p>
          <p id="empty_message">{LOOKS_HAVENOT_ADDED_ANYTING}</p>
        </div>
      )}
    </>
  );
}

export default Cart;
