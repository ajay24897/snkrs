import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import Loader from "../../common/component/loader";
import GridProductUI from "../../common/component/productUI/gridProduct";
import { GetProductUI } from "../../common/component/productUI/singleProduct";
import { firebaseData } from "../../common/function";
import { mensApi } from "../../firebase/services/snkrs.services";

function Men() {
  let { id } = useParams();
  let [allData, setAllData] = useState([]);
  let [start, setStart] = useState(0);
  const [last, setLast] = useState();

  let getSnk = async (id) => {
    if (id)
      try {
        let doc = await mensApi.getSnkr(id);
        return { ...doc.data(), id: doc.id };
      } catch (err) {
        console.log("ededdede", err);
      }
  };

  let fetchSnkr = async (start) => {
    if (!id) {
      try {
        let res = await mensApi.getPaginatedSnkrs(start);
        const lastVisible = res.docs[res.docs.length - 1];
        setLast(lastVisible);
        return firebaseData(res);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const {
    isLoading,
    data,
    isFetching,
    refetch: allRefetch,
  } = useQuery(["allSnkr", start], () => fetchSnkr(start), {
    keepPreviousData: true,
    enabled: false,
  });

  const {
    isLoading: ssLoading,
    data: ssData,
    isFetching: ssIsFetching,
    refetch,
  } = useQuery("singleSnkr", () => getSnk(id), {
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
          page={"men"}
        />
      )}
      {(isLoading || isFetching) && !id && <Loader showOverlay={!start} />}
      {id && <GetProductUI product={ssData} />}
      {(ssLoading || ssIsFetching) && id && <Loader showOverlay={true} />}
    </>
  );
}

export default Men;
