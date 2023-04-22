import React from "react";
import "./LoadingSpinner.css";

/** Loading message used by components that fetch API data. */

function LoadingSpinner() {
  return (
    <div class="LoadingSpinner">
      <div class="loader_filmstrip"></div>
      <p class="loader_text">Loading...</p>
    </div>
  );
}

export default LoadingSpinner;
