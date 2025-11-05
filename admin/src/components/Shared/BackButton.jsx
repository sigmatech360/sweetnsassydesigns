import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
    const navigate = useNavigate();
  return (
    <button className="back-btn" onClick={() => navigate(-1)}>
      <FaArrowLeftLong /> 
    </button>
  );
};

export default BackButton;
