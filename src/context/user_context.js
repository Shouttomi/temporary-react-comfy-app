import React, { useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const UserContext = React.createContext();
export const UserProvider = ({ children }) => {
  const {  loginWithRedirect, logout, user,isLoading } =
    useAuth0();

    const [myuser,setmyuser] = useState(null)

    useEffect(()=>{
     
      console.log(user)

     console.log(isLoading)
      setmyuser(user)
    
  },[user])

  return (
    <UserContext.Provider value={{loginWithRedirect,logout,myuser}}>{children}</UserContext.Provider>
  );
};
// make sure use
export const useUserContext = () => {
  return useContext(UserContext);
};
