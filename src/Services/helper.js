import axios from "axios";
import { getToken } from "./auth";
import { isLoggedIn, doLogout } from "./auth";
import { toast } from "react-toastify";

export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_DEV_URL
    : process.env.REACT_APP_PROD_URL;

export const BlogsPageBackground = "background1.jpg";

export const HomePageHeaderBG = "background.jpeg";

export const profilePhoto = "profile.webp";

export const brand = "brand.png";

export const myAxios = axios.create({
  baseURL: BASE_URL,
});

export const privateAxios = axios.create({
  baseURL: BASE_URL,
});

privateAxios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      return config;
    }
  },
  (error) => Promise.reject(error)
);

privateAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    if (error.response.status == 401) {
      if (isLoggedIn())
        doLogout(() => {
          toast.error("Session expired,Please logout");
        });
    }
    return Promise.reject(error);
  }
);
