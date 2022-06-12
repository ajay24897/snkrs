import React from "react";
import { useParams } from "react-router-dom";

function Men() {
  let param = useParams();
  console.log(param);
  return <h1>Men</h1>;
}

export default Men;
