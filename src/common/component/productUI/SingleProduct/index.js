import React, { useEffect, useState } from "react";
import ProductInfo from "./productInfo";
import "./styles.css";

export const GetProductUI = ({ product }) => {
  const [coords, setCoords] = useState();
  const [showZoomImage, setShowZoomImage] = useState(false);

  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    if (windowSize < 1024 && showZoomImage) setShowZoomImage(false);
  }, [showZoomImage, windowSize]);

  useEffect(() => {
    const handleResize = () => {
      if (windowSize > 1023) setWindowSize(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const handleMouseMove = (event) => {
    if (windowSize >= 1024) {
      setCoords({
        x: (event.clientX - event.target.offsetLeft) * 0.2 + "%",
        y: (event.clientY - event.target.offsetTop) * 0.2 + "%",
      });
    }
    if (!showZoomImage) setShowZoomImage((prev) => !prev);
  };

  const handleMouseOut = () => {
    if (showZoomImage && windowSize >= 1024) setShowZoomImage((prev) => !prev);
  };
  return (
    <div id={"wrapper"}>
      <img
        onMouseMove={handleMouseMove}
        onMouseOut={handleMouseOut}
        src={product?.media}
        id={"image"}
        alt={"shoe"}
      />

      {product && <ProductInfo product={product} />}

      {showZoomImage && windowSize >= 1024 && (
        <img
          src={product?.media}
          width={600}
          height={600}
          style={{
            position: "absolute",
            left: 750,
            top: 100,
            objectFit: "none",
            objectPosition: `${coords?.x} ${coords?.y}`,
          }}
          id={"zoomed-image"}
          alt={"shoe"}
        />
      )}
    </div>
  );
};

export default GetProductUI;
