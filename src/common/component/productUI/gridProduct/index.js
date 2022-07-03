import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import SingleProduct from "../utils";

import "./style.css";

function GridProductUI({ data = [], fetchNextPage = () => {}, page = "" }) {
  return (
    <InfiniteScroll
      dataLength={data?.length} //This is important field to render the next data
      next={fetchNextPage}
      hasMore={true}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
      className="product-grid overflow-hidden"
    >
      {data?.map((product, index) => (
        <SingleProduct key={product.name} product={product} page={page} />
      ))}
    </InfiniteScroll>
  );
}

export default GridProductUI;
