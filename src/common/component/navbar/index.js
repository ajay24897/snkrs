import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { cartApi } from "../../../firebase/services/snkrs.services";
import route from "../../constant/string/route.string";
import { firebaseData } from "../../function";
import DesktopNavigation from "./desktop";
import MobileNavigation from "./mobile";

import "./styles.css";

function Navbar() {
  const { userDetails } = useSelector((state) => state.userAuthReducer);
  let { totalItems } = useSelector((state) => state.cartDetailsReducer);

  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const { data, refetch } = useQuery(
    "cart",
    () => cartApi.getSnkr(userDetails?.email),
    {
      enabled: false,
    }
  );

  useEffect(() => {
    if (userDetails?.email && !pathname.includes(route.cart) && !totalItems)
      refetch();
  }, [pathname, refetch, totalItems, userDetails]);

  useEffect(() => {
    if (data) dispatch({ type: "INITIAL_CART_ITEM", data: firebaseData(data) });
  }, [data, dispatch]);

  return (
    <div id="navbar_container">
      <DesktopNavigation />
      <MobileNavigation />
    </div>
  );
}

export default Navbar;
