import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/cart_reducer";
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from "../actions";

const getlocalstorage = ()=>{
  let cart = localStorage.getItem('cart')
  
  if(cart){
    return JSON.parse(localStorage.getItem('cart'))
  }
  else{
    return []
  }
}

const initialState = {
  cart: getlocalstorage(),
  total_items: 0,
  total_amount: 0,
  shipping_fee: 534,
};

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addtocart = (id, color, amount, product) => {
    dispatch({
      type: ADD_TO_CART,
      payload: { id: id, color: color, amount: amount, product: product },
    });
  };

  //removeitem
  const removeitem = (id) => {
    dispatch({type:REMOVE_CART_ITEM,payload: id})
  };

  //toggleamount

  const toggleamount = (id, value) => {
    dispatch({type:TOGGLE_CART_ITEM_AMOUNT, payload:{id,value}})
  };

  //clearcart

  const clearcart = () => {
    dispatch({type:CLEAR_CART})
  };

  useEffect(()=>{

    dispatch({type: COUNT_CART_TOTALS})
    localStorage.setItem('cart',JSON.stringify(state.cart))

  },[state.cart])

  return (
    <CartContext.Provider
      value={{ ...state, addtocart, removeitem, toggleamount, clearcart }}
    >
      {children}
    </CartContext.Provider>
  );
};
// make sure use
export const useCartContext = () => {
  return useContext(CartContext);
};
