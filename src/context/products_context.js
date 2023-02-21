import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/products_reducer'

//we are giving and alias to products-url 
//which means we will call products-url as url
import { products_url as url } from '../utils/constants'
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

const initialState = {
  issidebaropen: false,
  products_loading:false,
  products_error:false,
  products:[],
  featured_products:[],
  single_product_loading:false,
  single_product_error:false,
  single_product:{},
}

const ProductsContext = React.createContext()

export const ProductsProvider = ({ children }) => {
  const[state,dispatch] = useReducer(reducer,initialState)

  const opensidebar = ()=>{
    dispatch({type:SIDEBAR_OPEN})
  }

  const closesidebar = ()=>{
    dispatch({type:SIDEBAR_CLOSE})
  }
 
  const fetchproducts = async(url)=>{

    dispatch({type: GET_PRODUCTS_BEGIN})

   try {
     const response = await axios.get(url)
     const products = response.data
     console.log(products)
     dispatch({type:GET_PRODUCTS_SUCCESS, payload: products})
    
   } catch (error) {
     dispatch({type:GET_PRODUCTS_ERROR});
    
   }
   
   

  }

  const fetchsingleproduct = async(url)=>{
    dispatch({type: GET_SINGLE_PRODUCT_BEGIN})
    try {
      const response = await axios.get(url);
      const singleproduct = response.data;
      console.log(singleproduct)
      dispatch({type:GET_SINGLE_PRODUCT_SUCCESS,payload:singleproduct})

      
    } catch (error) {
      dispatch({type:GET_SINGLE_PRODUCT_ERROR})
    }

  }

  useEffect(()=>{
    fetchproducts(url)
  },[])

  return (
    <ProductsContext.Provider value={{...state,
    opensidebar,
    closesidebar,
    fetchsingleproduct
    }}>
      {children}
    </ProductsContext.Provider>
  )
}
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext)
}
