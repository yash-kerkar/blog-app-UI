import axios from "axios";
import { Router, useNavigate } from "react-router-dom";
import { privateAxios } from "./helper";

export const doLogin = (data, next) => {
  localStorage.setItem("data", JSON.stringify(data));
  next();
};

export const isLoggedIn = () => {
  let data = localStorage.getItem("data");
  if (data == null) return false;
  else return true;
};

export const doLogout = (next) => {
  localStorage.removeItem("data");
  next();
};

export const getCurrentUser = () => {
  if (isLoggedIn()) {
    return JSON.parse(localStorage.getItem("data")).user;
  } else return false;
};

export const isAdmin = () => {
  if (isLoggedIn()) {
    let admin = false;
    JSON.parse(localStorage.getItem("data")).user.roles.forEach((role) => {
      if (role.name == "ROLE_ADMIN") admin = true;
    });
    return admin;
  } else return false;
};

export const getToken = () => {
  if (isLoggedIn) {
    return JSON.parse(localStorage.getItem("data")).token;
  } else return null;
};
