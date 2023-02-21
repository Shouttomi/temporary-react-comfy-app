import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
// will remove later
//import { useUserContext } from '../context/user_context';
import { Checkout } from '.';

//rest is gathering exact path='/checkout'

const PrivateRoute = ({children}) => {

  console.log(children)

  const {user} = useAuth0();

  //we will look for the user if it exists and if it does
  //then we will direct to the children which in our case 
  //is the checkout otherwise we will direct to home
 
  if(!user){
    return <Navigate to='/'/>

  }

  return children;
};
export default PrivateRoute;

