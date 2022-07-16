import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";

import { cartApi } from "../../../firebase/services/snkrs.services";
import { firebaseData, isLoading } from "../../function";
import Loader from "../loader";
import { FETCHING_CART_DETAILS } from "../loader/messages";
import DesktopNavigation from "./desktop";
import MobileNavigation from "./mobile";

import "./styles.css";

function Navbar() {
  const { userDetails } = useSelector((state) => state.userAuthReducer);
  const dispatch = useDispatch();

  const { data, status, refetch } = useQuery(
    "cart",
    () => cartApi.getSnkr(userDetails?.email),
    {
      enabled: false,
    }
  );

  useEffect(() => {
    if (userDetails?.email) refetch();
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
