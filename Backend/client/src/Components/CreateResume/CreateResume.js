import React from "react";
import "./CreateResume.css";
import CarouselCreator from "../CarouselCreator/CarouselCreator";

const CreateResume = ({ onCreate }) => {
  return <div className="create-resume"><CarouselCreator onCreate={onCreate}/></div>;
};

export default CreateResume;
