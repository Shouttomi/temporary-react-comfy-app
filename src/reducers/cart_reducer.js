import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {

  if(action.type === ADD_TO_CART){
    const {id,color,amount,product} = action.payload;

    const tempitem = state.cart.find((i) => i.id === id + color)

    if(tempitem){

      const tempcart = state.cart.map((cartitem)=>{
       if(cartitem.id === id+color){
        let newamount = cartitem.amount + amount;

        if(newamount>cartitem.max){
          newamount = cartitem.max
        }

        return {...cartitem,amount:newamount}

       }
       else{
        return cartitem
       }

      })

    return {...state,cart:tempcart}

    }

    else{
      const newitem={
        id: id+color,
        name:product.name,
        color: color,
        amount: amount,
        image: product.images[0].url,
        price:product.price,
        max:product.stock

      }
      return {...state, cart:[...state.cart,newitem]}
    }

  }

  if(action.type === REMOVE_CART_ITEM){
    const tempcart = state.cart.filter((item)=>{
      return item.id !== action.payload
    })

    return {...state, cart:tempcart}
  }

  if(action.type === CLEAR_CART){
    return {...state, cart:[]}
  }

  if(action.type === TOGGLE_CART_ITEM_AMOUNT){
    const {id,value} = action.payload
    const tempcart = state.cart.map((item)=>{
      if(item.id === id){
        if(value === 'inc'){

          let newamount = item.amount + 1
          if(newamount > item.max){
            newamount = item.max

          }

          return{...item,amount:newamount}

        }
        if(value === 'dec'){

          let newamount = item.amount - 1
          if(newamount < 1){
            newamount = 1

          }

          return{...item,amount:newamount}


        }

      }
      return item

    })

    return{...state,cart:tempcart}

  }

  if(action.type === COUNT_CART_TOTALS){
    const {total_items,total_amount} = state.cart.reduce((total,cartitem)=>{

      const {amount,price} = cartitem
      total.total_items += amount;
      total.total_amount += price*amount


      return total

    },{
      total_items:0,
      total_amount:0,
    })

    return{...state,total_amount,total_items}

  }


 // return state
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
