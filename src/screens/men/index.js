import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import GridProductUI from "../../common/component/productUI/gridProduct";
import mensApi from "../../firebase/services/snkrs.services";

function Men() {
  let { id } = useParams();
  let [allData, setAllData] = useState([]);
  let [singleSnkr, setSingleSnkr] = useState();

  let [start, setStart] = useState(0);
  const [last, setLast] = useState();
  let param = useParams();
  console.log(param);

  useEffect(() => {
    if (param.id) {
      getSnk(param.id);
    }
  }, [param]);

  let getSnk = async (id) => {
    try {
      let doc = await mensApi.getSnkr(id);
      setSingleSnkr({ ...doc.data(), id: doc.id });
    } catch (err) {
      console.log(err);
    }
  };

  let fun = async (start) => {
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

  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useQuery(["users", start], () => fun(start), {
      keepPreviousData: true,
    });

  useEffect(() => {
    if (data) setAllData([...allData, ...data]);
  }, [data]);

  return !param.id && !isLoading ? (
    <GridProductUI
      fetchNextPage={() => setStart(last)}
      data={allData}
      page={"men"}
    />
  ) : (
    <GetProductUI product={singleSnkr} />
  );
}

export const GetProductUI = ({ product }) => {
  const [coords, setCoords] = useState();

  const [globalCoords, setGlobalCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // 👇️ get global mouse coordinates
    const handleWindowMouseMove = (event) => {
      setGlobalCoords({
        x: event.screenX,
        y: event.screenY,
      });
    };
    window.addEventListener("mousemove", handleWindowMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleWindowMouseMove);
    };
  }, []);

  const handleMouseMove = (event) => {
    console.log(
      event.clientX - event.target.offsetLeft,
      event.clientY - event.target.offsetTop
    );
    setCoords({
      x: (event.clientX - event.target.offsetLeft) * 0.4 + "%",
      y: (event.clientY - event.target.offsetTop) * 0.4 + "%",
    });
  };
  return (
    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
      <img
        onMouseMove={handleMouseMove}
        src={product?.media}
        width={300}
        height={300}
        style={{
          display: "block",
        }}
        id={"image"}
      />

      <img
        src={product?.media}
        width={800}
        height={600}
        style={{
          display: "block",

          objectFit: "none",
          objectPosition: `${coords?.x} ${coords?.y}`,
        }}
      />
    </div>
  );
};

export default Men;
