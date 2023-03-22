import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectUser } from "../features/userSlice";
import { isAdmin } from "../Services/auth";

function AdminRoute() {
  return isAdmin() ? <Outlet /> : <Navigate to="/login"></Navigate>;
}

export default AdminRoute;
