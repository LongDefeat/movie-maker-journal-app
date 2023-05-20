import React from "react";
import "./LoadingSpinner.css";

/** Loading message used by components that fetch API data. */

function LoadingSpinner() {
  return (
    <div className="LoadingSpinner">
      <div className="loader_filmstrip"></div>
      <p className="loader_text">Loading...</p>
    </div>
  );
}

export default LoadingSpinner;
