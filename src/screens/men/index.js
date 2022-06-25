import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import GridProductUI from "../../common/component/productUI/gridProduct";
import { GetProductUI } from "../../common/component/productUI/SingleProduct";
import mensApi from "../../firebase/services/snkrs.services";

function Men() {
  let { id } = useParams();
  let [allData, setAllData] = useState([]);
  let [singleSnkr, setSingleSnkr] = useState();

  let [start, setStart] = useState(0);
  const [last, setLast] = useState();

  useEffect(() => {
    if (id) {
      getSnk(id);
    }
  }, [id]);

  let getSnk = async (id) => {
    try {
      let doc = await mensApi.getSnkr(id);
      setSingleSnkr({ ...doc.data(), id: doc.id });
    } catch (err) {
      console.log(err);
    }
  };

  let fetchSnkr = async (start) => {
    console.log(start);
    let arr = [];
    try {
      let res = await mensApi.getPaginatedSnkrs(start);
      res.docs.map((doc) => {
        arr.push({ ...doc.data(), id: doc.id });
      });
      const lastVisible = res.docs[res.docs.length - 1];
      setLast(lastVisible);

      return arr;
    } catch (err) {
      console.log(err);
    }
  };

  const { isLoading, data, isFetching } = useQuery(
    ["users", start],
    () => fetchSnkr(start),
    {
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    if (data) setAllData([...allData, ...data]);
  }, [data]);

  return (
    <>
      {!id && !isLoading && (
        <GridProductUI
          fetchNextPage={() => setStart(last)}
          data={allData}
          page={"men"}
        />
      )}
      {id && <GetProductUI product={singleSnkr} />}
    </>
  );
}

export default Men;
