import {User} from 'firebase/auth'

type ChildrenProps = {
  children: React.ReactNode;
};

type ActionTypes = {
  type: 'LOGIN' | 'LOGOUT';
  payload: User | null;
};
type StateTypes = {
  user: User | null;
};
type ContextTypes = {
  user :User | null,
  dispatch : Dispatch<ActionTypes > 
} 
import React, { createContext, Dispatch, useReducer } from "react";

export const AuthContext = createContext<ContextTypes | null>(null);

const AuthContextProvider = ({ children }: ChildrenProps) => {
  const initialUser: StateTypes = { user: null };
  const authReducer = (state: StateTypes | null, action: ActionTypes) => {
    switch (action?.type) {
      case "LOGIN":
        return {
          
          user: action?.payload,
        };
      case "LOGOUT":
        return {
          
          user: null,
        };
      default:
        return {
          
          user: null,
        };
    }
  };
  const [state, dispatch] = useReducer(authReducer, initialUser);
 
  return (
    <>
      <AuthContext.Provider value={{ user:state.user, dispatch }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthContextProvider;
