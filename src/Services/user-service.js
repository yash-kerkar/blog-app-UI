import { myAxios } from "./helper";

export const signup = async (user) => {
  return myAxios.post("auth/register", user).then((response) => response.data);
};

export const login = async (user) => {
  return myAxios.post("auth/login", user).then((response) => response.data);
};

export const getUserById = async (id) => {
  return myAxios.get(`users/${id}`).then((resp) => resp.data);
};
