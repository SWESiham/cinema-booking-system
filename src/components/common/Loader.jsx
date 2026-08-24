import React from "react";
import './Loader.css'
const Loader = ({ label = "Loading..." }) => {
  return (
    <div className="loader">
      <div className="loader__reel">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <p className="loader__label">{label}</p>
    </div>
  );
};

export default Loader;
