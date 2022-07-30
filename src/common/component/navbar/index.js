import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { cartApi } from "../../../firebase/services/snkrs.services";
import route from "../../constant/string/route.string";
import { firebaseData, isLoading } from "../../function";
import Loader from "../loader";
import { FETCHING_CART_DETAILS } from "../loader/messages";
import DesktopNavigation from "./desktop";
import MobileNavigation from "./mobile";

import "./styles.css";

function Navbar() {
  const { userDetails } = useSelector((state) => state.userAuthReducer);
  let { totalItems } = useSelector((state) => state.cartDetailsReducer);

  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const { data, status, refetch } = useQuery(
    "cart",
    () => cartApi.getSnkr(userDetails?.email),
    {
      enabled: false,
    }
  );

  useEffect(() => {
    if (userDetails?.email && !pathname.includes(route.cart) && !totalItems)
      refetch();
  }, [refetch, userDetails]);

  useEffect(() => {
    if (data) dispatch({ type: "INITIAL_CART_ITEM", data: firebaseData(data) });
  }, [data, dispatch]);

  return (
    <>
      <div id="navbar_container">
        <DesktopNavigation />
        <MobileNavigation />
      </div>
      {isLoading(status) && (
        <Loader showOverlay message={FETCHING_CART_DETAILS} />
      )}
    </>
  );
}

export default Navbar;
