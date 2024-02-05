import React from "react";
import "./CarouselCreator.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const CarouselCreator = () => {
  const responsive = {
    standard: {
      breakpoint: { max: 4000, min: 1200 },
      items: 3,
    },
    small: {
      breakpoint: { max: 1200, min: 0 },
      items: 2,
    },
  };
  return (
    <div className="carousel">
      <h1>Resume Templates</h1>
      <Carousel
        responsive={responsive}
        className="carousel-container"
        partialVisible={false}
        autoPlay={true}
        swipeable={true}
        draggable={true}
        infinite={true}
      >
        <div className="card">
          <img
            className="product-image"
            src="https://d25zcttzf44i59.cloudfront.net/academic-word-resume-template.png"
            alt="Template 1"
          />
          <h3>Template 1</h3>
          <p>
            <button>Create</button>
          </p>
        </div>
        <div className="card">
          <img
            className="product-image"
            src="https://d25zcttzf44i59.cloudfront.net/academic-word-resume-template.png"
            alt="Template 2"
          />
          <h3>Template 2</h3>
          <p>
            <button>Create</button>
          </p>
        </div>
        <div className="card">
          <img
            className="product-image"
            src="https://d25zcttzf44i59.cloudfront.net/academic-word-resume-template.png"
            alt="Template 3"
          />
          <h3>Template 3</h3>
          <p>
            <button>Create</button>
          </p>
        </div>
        <div className="card">
          <img
            className="product-image"
            src="https://d25zcttzf44i59.cloudfront.net/academic-word-resume-template.png"
            alt="Template 4"
          />
          <h3>Template 4</h3>
          <p>
            <button>Create</button>
          </p>
        </div>
        <div className="card">
          <img
            className="product-image"
            src="https://d25zcttzf44i59.cloudfront.net/academic-word-resume-template.png"
            alt="Template 5"
          />
          <h3>Template 5</h3>
          <p>
            <button>Create</button>
          </p>
        </div>
        <div className="card">
          <img
            className="product-image"
            src="https://d25zcttzf44i59.cloudfront.net/academic-word-resume-template.png"
            alt="Template 6"
          />
          <h3>Template 6</h3>
          <p>
            <button>Create</button>
          </p>
        </div>
      </Carousel>
    </div>
  );
};

export default CarouselCreator;
