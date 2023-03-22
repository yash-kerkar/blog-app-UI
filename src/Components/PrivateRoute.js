import { isLoggedIn } from "../Services/auth";
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../Context/UserProvider";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

export const PrivateRoute = () => {
  return isLoggedIn() ? <Outlet /> : <Navigate to="/login"></Navigate>;
};
