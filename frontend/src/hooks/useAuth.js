import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    console.log("useAuth must be used inside AuthContextProvider");
    return
  }
  return context;
};

export default useAuth
