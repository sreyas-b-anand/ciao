type ChildrenProps = {
  children: React.ReactNode;
};

type ActionTypes = {
  type: string;
  payload: object | null;
};
type StateTypes = {
  user: object | null;
};
type ContextTypes = {
  user : object | null,
  dispatch : Dispatch<ActionTypes > 
} 
import React, { createContext, Dispatch, useReducer } from "react";

export const AuthContext = createContext<ContextTypes | null>(null);

const AuthContextProvider = ({ children }: ChildrenProps) => {
  const initialUser: StateTypes = { user: null };
  const authReducer = (state: StateTypes, action: ActionTypes) => {
    switch (action?.type) {
      case "LOGIN":
        return {
          ...state,
          user: action?.payload,
        };
      case "LOGOUT":
        return {
          ...state,
          user: null,
        };
      default:
        return {
          ...state,
          user: null,
        };
    }
  };
  const [user, dispatch] = useReducer(authReducer, initialUser);
  console.log(user)
  return (
    <>
      <AuthContext.Provider value={{ user, dispatch }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthContextProvider;
