import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { filter, sortByPrice, search } from "@/redux/productSlice";
import "./Filters.css";

const generatePriceRangeArray = () => {
  let result = [];
  for (let i = 0; i < 10; i++) {}
};

const Filters = ({ categories }) => {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    category: "",
    priceRange: "",
    sort: "",
    search: "",
  });

  const categoryChange = (event) => {
    console.log(event.target.value);
    setState((prev) => {
      return { ...prev, category: event.target.value };
    });

    if (state.priceRange) {
      let result = state.priceRange.split(" - ");
      dispatch(
        filter({
          category: event.target.value,
          price: { low: parseInt(result[0]), high: parseInt(result[1]) },
        })
      );
    } else {
      dispatch(filter({ category: event.target.value, price: "" }));
    }
    if (state.search) {
      dispatch(search(state.search));
    }
    if (state.sort) {
      let result = state.sort.split(" - ");
      if (result[1] === "Ascending") {
        dispatch(sortByPrice({ category: result[0], ascending: true }));
      } else {
        dispatch(sortByPrice({ category: result[0], ascending: false }));
      }
    }
  };

  const priceChange = (event) => {
    setState((prev) => {
      return { ...prev, priceRange: event.target.value };
    });
    if (event.target.value) {
      let result = event.target.value.split(" - ");
      dispatch(
        filter({
          category: state.category,
          price: { low: parseInt(result[0]), high: parseInt(result[1]) },
        })
      );
    } else {
      dispatch(filter({ category: state.category, price: "" }));
    }
    if (state.search) {
      dispatch(search(state.search));
    }
    if (state.sort) {
      let result = state.sort.split(" - ");
      if (result[1] === "Ascending") {
        dispatch(sortByPrice({ category: result[0], ascending: true }));
      } else {
        dispatch(sortByPrice({ category: result[0], ascending: false }));
      }
    }
  };

  const sortChange = (event) => {
    setState((prev) => {
      return { ...prev, sort: event.target.value };
    });
    if (event.target.value) {
      let result = event.target.value.split(" - ");
      if (result[1] === "Ascending") {
        dispatch(sortByPrice({ category: result[0], ascending: true }));
      } else {
        dispatch(sortByPrice({ category: result[0], ascending: false }));
      }
    }
  };

  const searchChange = (event) => {
    console.log(event.target.value);
    setState((prev) => {
      return { ...prev, search: event.target.value };
    });

    if (state.priceRange) {
      let result = state.priceRange.split(" - ");
      dispatch(
        filter({
          category: state.category,
          price: { low: parseInt(result[0]), high: parseInt(result[1]) },
        })
      );
    } else {
      console.log("HERE");
      dispatch(filter({ category: state.category, price: "" }));
    }
    if (event.target.value) {
      //console.log(event.target.value);
      dispatch(search({ search: event.target.value }));
    }
    if (state.sort) {
      let result = state.sort.split(" - ");
      if (result[1] === "Ascending") {
        dispatch(sortByPrice({ category: result[0], ascending: true }));
      } else {
        dispatch(sortByPrice({ category: result[0], ascending: false }));
      }
    }
  };

  // useEffect(() => {
  //   console.log("Filters", categories);
  // });
  return (
    <div className="wrapper">
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={state.category}
          label="Category"
          onChange={categoryChange}
        >
          <MenuItem value={""}>None</MenuItem>
          {categories.map((ele) => {
            //console.log(ele);
            return <MenuItem value={ele}>{ele}</MenuItem>;
          })}
          {/* <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem> */}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Price range</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={state.priceRange}
          label="Price range"
          onChange={priceChange}
        >
          <MenuItem value={""}>None</MenuItem>
          <MenuItem value={"0 - 250"}>0 - 250</MenuItem>
          <MenuItem value={"250 - 500"}>250 - 500</MenuItem>
          <MenuItem value={"500 - 750"}>500 - 750</MenuItem>
          <MenuItem value={"750 - 1000"}>750 - 1000</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sort</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={state.sort}
          label="Sort"
          onChange={sortChange}
        >
          <MenuItem value={""}>None</MenuItem>
          <MenuItem value={"Price - Ascending"}>Price - Ascending</MenuItem>
          <MenuItem value={"Price - Descending"}>Price - Descending</MenuItem>
          <MenuItem value={"Rating - Ascending"}>Rating - Ascending</MenuItem>
          <MenuItem value={"Rating - Descending"}>Rating - Descending</MenuItem>
        </Select>
      </FormControl>
      <TextField
        id="outlined-basic"
        label="Search"
        variant="outlined"
        value={state.search}
        onChange={searchChange}
      />
    </div>
  );
};

export default Filters;
