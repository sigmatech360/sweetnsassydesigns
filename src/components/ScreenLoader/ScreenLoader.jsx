import React from "react";
import "./ScreenLoader.css"; // or use Tailwind if you're using it
import { RotatingLines } from "react-loader-spinner";
import logo from "../../assets/images/headerLogo.webp";

const ScreenLoader = () => {
  return (
    <div className="screen-loader">
      <img
        src={logo}
        alt="Brand Logo"
        className="loader-logo "
      />
      <div className="loader-text">
        {/* Loading... */}
        <RotatingLines
          visible={true}
          height="50"
          width="50"
          color="yellow"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    </div>
  );
};

export default ScreenLoader;
