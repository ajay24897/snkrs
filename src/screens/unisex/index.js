import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import Loader from "../../common/component/loader";
import GridProductUI from "../../common/component/productUI/gridProduct";
import { GetProductUI } from "../../common/component/productUI/singleProduct";
import { firebaseData } from "../../common/function";
import { unisexApi } from "../../firebase/services/snkrs.services";
import NotFound from "../404";

function Unisex() {
  let { id } = useParams();
  let [allData, setAllData] = useState([]);
  let [start, setStart] = useState(0);
  const [last, setLast] = useState();
  const unisex = [4, 5, 6, 7, 8, 9, 10];

  let getSnk = async (id) => {
    if (id)
      try {
        let doc = await unisexApi.getSnkr(id);
        return { ...doc.data(), id: doc.id };
      } catch (err) {
        // console.log("ededdede", err);
      }
  };

  let fetchSnkr = async (start) => {
    if (!id) {
      try {
        let res = await unisexApi.getPaginatedSnkrs(start);
        const lastVisible = res.docs[res.docs.length - 1];
        setLast(lastVisible);
        return firebaseData(res);
      } catch (err) {
        // console.log(err);
      }
    }
  };

  const {
    isLoading,
    data,
    isFetching,
    refetch: allRefetch,
  } = useQuery(["all-unisex-Snkr", start], () => fetchSnkr(start), {
    keepPreviousData: true,
    enabled: false,
  });

  const {
    isLoading: ssLoading,
    data: ssData,
    isFetching: ssIsFetching,
    refetch,
  } = useQuery("single-unisex-Snkr", () => getSnk(id), {
    enabled: false,
  });

  useEffect(() => {
    if (data) setAllData([...allData, ...data]);
  }, [data]);

  useEffect(() => {
    if (id) refetch();
  }, [refetch, id]);
  useEffect(() => {
    if (!id) allRefetch();
  }, [refetch, start, id]);

  return (
    <>
      {!id && !isLoading && (
        <GridProductUI
          fetchNextPage={() => setStart(last)}
          data={allData}
          page={"unisex"}
        />
      )}
      {(isLoading || isFetching) && !id && <Loader showOverlay={!start} />}
      {!ssLoading &&
        id &&
        (ssData?.retailPrice ? (
          <GetProductUI product={ssData} sizes={unisex} />
        ) : (
          <NotFound
            heading={"OOP'S"}
            title={"Product not found"}
            subtitle={"We couldn't find the product you were looking for."}
            goback={true}
          />
        ))}
      {(ssLoading || ssIsFetching) && id && <Loader showOverlay={true} />}
    </>
  );
}

export default Unisex;
