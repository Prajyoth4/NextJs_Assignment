import Filters from "./Filters/Filters";
import Grid from "./Grid/Grid";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductsAsync } from "@/redux/productSlice";

const App = () => {
  const dispatch = useDispatch();
  //const displayProducts = useSelector((state) => state.products.display);
  const state = useSelector((state) => state);

  useEffect(() => {
    dispatch(getProductsAsync());
  }, [dispatch]);

  // useEffect(() => {
  //   // console.log("displayProducts updated");
  //   // console.log(state.products.categories);
  //   // console.log(displayProducts);
  //   // console.log(state);
  // }, [state]);
  return (
    <div>
      <Filters categories={state.products.categories} state={state} />
      <Grid displayProducts={state.products.display} />
    </div>
  );
};

export default App;
