import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { cartApi } from "../../../firebase/services/snkrs.services";
import { firebaseData } from "../../function";

import DesktopNav from "./desktop";
import MobileNavigation from "./mobile";

function Navbar() {
  const { userDetails } = useSelector((state) => state.userAuthReducer);

  const dispatch = useDispatch();

  const { data, isFetching, refetch } = useQuery(
    "cart",
    () => cartApi.getSnkr(userDetails?.email),
    {
      enabled: false,
    }
  );
  useEffect(() => {
    if (data) {
      let arr = [];
      data.docs?.map((doc) => {
        arr.push({ ...doc.data() });
      });
      console.log("eeded", arr.length);
      dispatch({ type: "INITIAL_CART_ITEM", data: arr });
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (userDetails?.email) refetch();
  }, [refetch, userDetails]);

  return (
    <div>
      <DesktopNav />
      <MobileNavigation />
    </div>
  );
}

export default Navbar;
