import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    let maxprice = action.payload.map((p) => p.price);
    maxprice = Math.max(...maxprice);
    return {
      ...state,
      //we are using the spread operator to just copy the
      //values we are not referencing to the same
      //place in the memory
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      filters: { ...state.filters, max_price: maxprice, price: maxprice },
    };
  }

  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true };
  }

  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false };
  }

  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload };
  }

  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state;

    let tempproducts = [...filtered_products];

    if (sort === "price-lowest") {
      //a represents the current item and b represents
      //the next item
      tempproducts = tempproducts.sort((a, b) => {
        return a.price - b.price;
      });
    }

    if (sort === "price-highest") {
      tempproducts = tempproducts.sort((a, b) => {
        return b.price - a.price;
      });
    }

    if (sort === "name-a") {
      tempproducts = tempproducts.sort((a, b) => {
        // this localCompare function compares two strings
        return a.name.localeCompare(b.name);
      });
    }

    if (sort === "name-z") {
      tempproducts = tempproducts.sort((a, b) => {
        // this localCompare function compares two strings
        return b.name.localeCompare(a.name);
      });
    }

    return { ...state, filtered_products: tempproducts };
  }

  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;

    //this [name]:value will only change the value of the property
    //whose key name matches with name
    return { ...state, filters: { ...state.filters, [name]: value } };
  }

  if (action.type === FILTER_PRODUCTS) {
    const { all_products } = state;
    const { text, category, company, color, price, shipping } = state.filters;

    let tempproducts = [...all_products];

    if (text) {
      tempproducts = tempproducts.filter((product) => {
        return product.name.toLowerCase().startsWith(text);
      });
    }

    //category

    if (category !== "all") {
      tempproducts = tempproducts.filter(
        (product) => product.category === category
      );
    }

    //company

    if (company !== "all") {
      tempproducts = tempproducts.filter(
        (product) => product.company === company
      );
    }

    //color


    if(color !== 'all'){
     tempproducts = tempproducts.filter((product)=>{
     
      return product.colors.find((c)=> c===color)
     })
    }

    //price
    
    tempproducts = tempproducts.filter((product)=> product.price <= price)

    //shipping
    if(shipping){
      tempproducts = tempproducts.filter((product)=> product.shipping===true)
    }

    return { ...state, filtered_products: tempproducts };
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: "",
        company: "all",
        category: "all",
        color: "all",
        price: state.filters.max_price,
        shipping: false,
      },
    };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
