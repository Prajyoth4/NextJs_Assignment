import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import endpoint from "../config";

export const getProductsAsync = createAsyncThunk(
  "products/getProductsAsync",
  async () => {
    const resp = await fetch(endpoint);
    if (resp.ok) {
      const products = await resp.json();
      return { products };
    }
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState: { all: [], display: [], categories: [] },
  reducers: {
    displayAllProducts: (state, action) => {
      state.display = state.all;
      //return { all: state.all, display: state.all };
    },
    filter: (state, action) => {
      let result = [...state.all];
      if (action.payload.category) {
        console.log("category");
        result = result.filter(
          (product) => product.category === action.payload.category
        );
      }
      if (action.payload.price) {
        console.log("price");
        let { low, high } = action.payload.price;
        //let high =
        result = result.filter(
          (product) => product.price >= low && product.price <= high
        );
      }
      console.log("filter", result);
      state.display = result;

      //return { all: state.all, display: result };
    },
    sortByPrice: (state, action) => {
      let result = state.display;
      console.log("sortByPrice", result);
      if (action.payload.category === "Price") {
        if (action.payload.ascending) {
          result.sort((a, b) => a.price - b.price);
        } else {
          result.sort((a, b) => b.price - a.price);
        }
      }
      if (action.payload.category === "Rating") {
        if (action.payload.ascending) {
          result.sort((a, b) => a.rating.rate - b.rating.rate);
        } else {
          result.sort((a, b) => b.rating.rate - a.rating.rate);
        }
      }
      //return state.filter((todo) => todo.id !== action.payload.id);
    },
    // sortByRating: (state, action) => {
    //   return state.filter((todo) => todo.id !== action.payload.id);
    // },
    search: (state, action) => {
      let result = state.display;
      //console.log("search", result);
      if (action.payload.search) {
        result = result.filter((ele) => {
          // console.log(ele.title);
          // console.log(ele.description);
          return (
            ele.title.includes(action.payload.search) ||
            ele.description.includes(action.payload.search)
          );
        });
      }
      state.display = result;
      //return { all: state.all, display: result };
    },
    // searchByDescription: (state, action) => {
    //   return state.filter((todo) => todo.id !== action.payload.id);
    // },
  },
  extraReducers: {
    [getProductsAsync.fulfilled]: (state, action) => {
      // console.log("Async Thunk");
      // console.log(action.payload);
      let categories = new Set();
      action.payload.products.forEach((element) => {
        categories.add(element.category);
      });
      categories = Array.from(categories);
      return {
        all: action.payload.products,
        display: action.payload.products,
        categories,
      };
    },
  },
});

// export const allProductSlice = createSlice({
//   name: "products",
//   initialState: [],
//   reducers: {},
//   extraReducers: {
//     [getProductsAsync.fulfilled]: (state, action) => {
//       return action.payload.products;
//     },
//   },
// });

export const { filter, sortByPrice, search } = productSlice.actions;

export default productSlice.reducer;
