import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import Loader from "../../common/component/loader";
import GridProductUI from "../../common/component/productUI/gridProduct";
import { GetProductUI } from "../../common/component/productUI/GetProductUI";
import { firebaseData } from "../../common/function";
import { womensApi } from "../../firebase/services/snkrs.services";
import NotFound from "../404";

function Women() {
  let { id } = useParams();
  let [allData, setAllData] = useState([]);
  let [start, setStart] = useState(0);
  const [last, setLast] = useState();
  const womens = [3, 4, 5, 6, 7, 8];

  let getSnk = async (id) => {
    if (id)
      try {
        let doc = await womensApi.getSnkr(id);
        return { ...doc.data(), id: doc.id };
      } catch (err) {
        // console.log("ededdede", err);
      }
  };

  let fetchSnkr = async (start) => {
    if (!id) {
      try {
        let res = await womensApi.getPaginatedSnkrs(start);
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
  } = useQuery(["womne-snkr", start], () => fetchSnkr(start), {
    keepPreviousData: true,
    enabled: false,
  });

  const {
    isLoading: ssLoading,
    data: ssData,
    isFetching: ssIsFetching,
    refetch,
  } = useQuery("womensingleSnkr", () => getSnk(id), {
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
          page={"women"}
        />
      )}
      {(isLoading || isFetching) && !id && <Loader showOverlay={!start} />}
      {!ssLoading &&
        id &&
        (ssData?.retailPrice ? (
          <GetProductUI product={ssData} sizes={womens} />
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

export default Women;
