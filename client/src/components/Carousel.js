import React, { useEffect, useState } from "react";

import "./carousel.css";
import { Icon } from "@iconify/react/dist/iconify.js";

const Indicator = (props) => {
  const { active } = props;
  return <span className={`indicator ${active && "active"}`}></span>;
};

const Carousel = (props) => {
  const { images, height } = props;
  const [slideIndex, setSlideIndex] = useState(0);

  const handleNext = () => {
    setSlideIndex((slideIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setSlideIndex(slideIndex - 1 >= 0 ? slideIndex - 1 : images.length - 1);
  };

  return (
    <div className="container">
      <button className="btn prev" onClick={() => handlePrev()}>
        <Icon className="" icon="mingcute:left-fill" />
      </button>

      <div
        className="image-container"
        style={{ transform: `translateX(-${slideIndex * 100}%)` }}
      >
        {images.map((image, i) => (
          <img
            key={i}
            src={image}
            alt={`slide-${i}`}
            // className={`max-h-[${height}]`}
          />
        ))}
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
        {images.map((image, i) => (
          <Indicator active={i === slideIndex} />
        ))}
      </div>

      <button className="btn next" onClick={() => handleNext()}>
        <Icon className="" icon="mingcute:right-fill" />
      </button>
    </div>
  );
};

export default Carousel;
