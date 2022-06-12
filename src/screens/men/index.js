import React from "react";
import { useParams } from "react-router-dom";

function Men() {
  let param = useParams();
  console.log(param);
  return <div>Men</div>;
}

export default Men;
