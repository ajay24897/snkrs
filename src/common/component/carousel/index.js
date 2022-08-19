import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import First from "./1.jpeg";
import Second from "./2.webp";
import Third from "./3.jpeg";

import "./styles.css";

var imageData = [
  { img: First, route: "men/uVZ9pFn3H6253oWQ9cD1" },
  { img: Second, route: "men/Gc6nBoPk475hripexwnZ" },
  { img: Third, route: "women/Y4BdOOEa8rPKzkkQ7l0W" },
];

function Carousel() {
  const navigate = useNavigate();

  useEffect(() => {
    const carousel = document.querySelector(".carousel");
    const slider = document.querySelector(".slider");

    let direction;
    let imageSlide = setInterval(() => {
      direction = -1;
      carousel.style.justifyContent = "flex-start";
      slider.style.transform = "translate(-33.33%)";
    }, 2000);

    slider.addEventListener(
      "transitionend",
      function () {
        if (direction === 1) {
          slider.prepend(slider.lastElementChild);
        } else {
          slider.appendChild(slider.firstElementChild);
        }
        slider.style.transition = "none";
        slider.style.transform = "translate(0)";
        setTimeout(() => {
          slider.style.transition = "all 2s";
        });
      },
      false
    );
    return () => {
      clearInterval(imageSlide);
    };
  }, []);
  return (
    <div class="carousel overflow-hidden">
      <div className="slider">
        {imageData.map((image, index) => {
          return (
            <img
              src={image.img}
              className="carousel-img"
              width="100vw"
              alt={"carousel-product"}
              onClick={() => navigate(image.route)}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
}
export default Carousel;
