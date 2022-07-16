import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from "prop-types";

import SingleProduct from "../utils";
import "./style.css";

function GridProductUI({ data, fetchNextPage = () => {}, page }) {
  return (
    <InfiniteScroll
      dataLength={data?.length}
      next={fetchNextPage}
      hasMore={true}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
      className="product-grid overflow-hidden"
    >
      {data?.map((product) => (
        <SingleProduct key={product.name} product={product} page={page} />
      ))}
    </InfiniteScroll>
  );
}

export default GridProductUI;

GridProductUI.defaultProps = {
  data: [],
  fetchNextPage: () => {},
};
GridProductUI.propTypes = {
  data: PropTypes.array,
  fetchNextPage: PropTypes.func,
  page: PropTypes.string.isRequired,
};
