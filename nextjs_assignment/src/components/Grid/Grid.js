import React, { useEffect } from "react";
import Card from "../Card/Card";
import "./Grid.css";

const Grid = ({ displayProducts }) => {
  //console.log("Grid", displayProducts);
  // useEffect(() => {
  //   //console.log("Grid", displayProducts);
  // });
  return (
    <div className="grid">
      {displayProducts &&
        displayProducts.map((ele) => {
          //console.log(ele);
          return <Card ele={ele} />;
        })}
    </div>
  );
};

export default Grid;
