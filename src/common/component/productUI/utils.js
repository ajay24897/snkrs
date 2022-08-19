import React from "react";
import { useNavigate } from "react-router-dom";
// import mensApi from "../../../firebase/services/snkrs.services";
import {
  capitalizeFirstLetter,
  removeRrandNameFromTitle,
} from "../../function";

const getProductShortInfo = ({ brand, name, title, id, retailPrice }) => {
  return (
    <div className="short-product-details">
      <h6 className="text-ellipsis">{capitalizeFirstLetter(brand)}</h6>
      <text className="text-ellipsis">
        {capitalizeFirstLetter(removeRrandNameFromTitle(title, brand))}
      </text>
      <p className="text-ellipsis" id="shoe-price">
        ${retailPrice < 50 ? 50 : retailPrice}
      </p>
      {/* <h1 onClick={async () => await handleDelete(id)}>Delete </h1> */}
    </div>
  );
};

const SingleProduct = ({ product, page }) => {
  const navigate = useNavigate();

  return (
    <div
      className="image-cnt cursor-pointer overflow-hidden "
      key={product.id}
      onClick={() => {
        navigate(`/snkrs/${page}/${product.id}`);
      }}
    >
      <div className="flex-r-center">
        <img src={product.media} className="productImg  image" alt="product" />
      </div>
      {getProductShortInfo(product)}
    </div>
  );
};

export default React.memo(SingleProduct);

//   const handleDelete = async (id) => {
//     console.log("data", id);
//     try {
//       let res = await mensApi.deleteSnkr(id);
//       console.log(res);
//     } catch (err) {
//       console.log(err);
//     }
//   };
