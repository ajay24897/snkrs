import React, { useEffect, useState } from "react";

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
        alt={"shoe"}
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
        alt={"shoe"}
      />
    </div>
  );
};

export default GetProductUI;
