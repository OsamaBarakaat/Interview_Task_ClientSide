import React from "react";
import "./Portfolio.css";
function Portfolio() {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <h1
          style={{
            animation: "appearAnimation 1s forwards",
          }}
        >
          Thanks for the opportunity{" "}
          <span role="img" aria-label="Smiling Face">
            😀❤️
          </span>
        </h1>
      </div>
    </>
  );
}

export default Portfolio;
