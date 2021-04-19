import React, { createContext, useEffect, useReducer, useState } from "react";
import { GET_USER } from "../reducers/type";
import { userReducer } from "../reducers/UserReducer";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  //State
  // const [isLogin, setIsLogin] = useState(true);

  //Reducer
  const [isLogin, dispatch] = useReducer(userReducer, []);

  //useEffect
  useEffect(() => {
    dispatch({
      type: GET_USER,
      payload: null,
    });
  }, []);

  //Function to toogle isLogin
  // const toogleIsLogin = () => {
  //   setIsLogin(!isLogin);
  // };

  //Context data
  const userContextData = { isLogin, dispatch };

  //Return provider
  return (
    <UserContext.Provider value={userContextData}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
