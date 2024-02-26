import React from "react";
import "./CarouselCreator.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Template from "./Template";

const CarouselCreator = ({ onCreate }) => {
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
        testId="corousel-container"
        responsive={responsive}
        className="carousel-container"
        partialVisible={false}
        autoPlay={true}
        swipeable={true}
        draggable={true}
        infinite={true}
      >
        <Template
          imageUrl="https://d25zcttzf44i59.cloudfront.net/academic-word-resume-template.png"
          templateName="Template 1"
          templateID="1"
          onCreate={onCreate}
        />
        <Template
          imageUrl="https://d25zcttzf44i59.cloudfront.net/academic-word-resume-template.png"
          templateName="Template 2"
          templateID="2"
          onCreate={onCreate}
        />
        <Template
          imageUrl="https://d25zcttzf44i59.cloudfront.net/academic-word-resume-template.png"
          templateName="Template 3"
          templateID="3"
          onCreate={onCreate}
        />
        <Template
          imageUrl="https://d25zcttzf44i59.cloudfront.net/academic-word-resume-template.png"
          templateName="Template 4"
          templateID="4"
          onCreate={onCreate}
        />
        <Template
          imageUrl="https://d25zcttzf44i59.cloudfront.net/academic-word-resume-template.png"
          templateName="Template 5"
          templateID="5"
          onCreate={onCreate}
        />
        <Template
          imageUrl="https://d25zcttzf44i59.cloudfront.net/academic-word-resume-template.png"
          templateName="Template 6"
          templateID="6"
          onCreate={onCreate}
        />
      </Carousel>
    </div>
  );
};

export default CarouselCreator;
