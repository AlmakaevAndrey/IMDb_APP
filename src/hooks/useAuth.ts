import { useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth used within an AuthProvider");
  }
  return context;
};