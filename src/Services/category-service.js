import { myAxios, privateAxios } from "./helper";

export const getAllCategories = async () => {
  return myAxios.get("categories/").then((response) => {
    return response.data;
  });
};

export const addCategory = async (category) => {
  return privateAxios
    .post("categories/", category)
    .then((response) => response.data);
};

export const deleteCategory = async (id) => {
  return privateAxios
    .delete(`categories/${id}`)
    .then((response) => response.data);
};

export const getCategory = async (id) => {
  return myAxios.get(`categories/${id}`).then((response) => response.data);
};

export const editCategory = async (id, category) => {
  return privateAxios
    .put(`categories/${id}`, category)
    .then((response) => response.data);
};
