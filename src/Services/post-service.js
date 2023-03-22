import { privateAxios } from "./helper";
import { myAxios } from "./helper";

export const createPost = async (post) => {
  return privateAxios
    .post(`/users/${post.userId}/categories/${post.categoryId}/posts`, post)
    .then((resp) => resp.data);
};

export const getAllposts = async (pageNumber, pageSize, sortBy, sortDir) => {
  return myAxios
    .get(
      `posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`
    )
    .then((resp) => resp.data);
};

export const getPost = async (id) => {
  return myAxios.get(`posts/${id}`).then((resp) => resp.data);
};

export const getComments = async (postId) => {
  return myAxios.get(`posts/${postId}/comments`).then((resp) => resp.data);
};

export const postComment = async (post, comment) => {
  return privateAxios
    .post(`user/${post.user.id}/post/${post.id}/comments`, { content: comment })
    .then((resp) => resp.data);
};

export const uploadImage = async (postId, image) => {
  let formData = new FormData();
  formData.append("image", image);
  return privateAxios
    .post(`post/image/upload/${postId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((resp) => resp.data);
};

export const replaceImage = async (postId, image) => {
  let formData = new FormData();
  formData.append("image", image);
  return privateAxios
    .post(`post/image/replace/${postId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((resp) => resp.data);
};

export const getPostsByCategory = async (
  categoryId,
  pageNumber,
  pageSize,
  sortBy,
  sortDir
) => {
  return myAxios
    .get(
      `categories/${categoryId}/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`
    )
    .then((resp) => resp.data);
};

export const getPostsByUser = async (
  userId,
  pageNumber,
  pageSize,
  sortBy,
  sortDir
) => {
  return myAxios
    .get(
      `users/${userId}/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`
    )
    .then((resp) => resp.data);
};

export const deletePostByUser = async (postId) => {
  return privateAxios.delete(`posts/${postId}`).then((resp) => resp.data);
};

export const editPostByUser = async (postId, post) => {
  return privateAxios.put(`posts/${postId}`, post).then((resp) => resp.data);
};

export const searchPostsByKeyword = async (
  keyword,
  pageNumber,
  pageSize,
  sortBy,
  sortDir
) => {
  return myAxios
    .get(
      `posts/search/${keyword}?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`
    )
    .then((resp) => resp.data);
};
