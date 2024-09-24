

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useAuthContext = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("Firebase authentication error");
  }
  const { user } = authContext;

  return user;
};

export default useAuthContext;
