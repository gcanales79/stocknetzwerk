import { basePath, apiVersion } from "./config";
import axios from "axios";

export function getPostsApi(limit,page){
    const url = `${basePath}/${apiVersion}/get-posts?limit=${limit}&page=${page}`;
    return axios
      .get(url)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err);
      });
}

export function deletePostApi(token,id){
  const url = `${basePath}/${apiVersion}/delete-post/${id}`;
  return axios
  .delete(url, {
    headers: { Accept: "application/json", Authorization: token },
  })
  .then((response) => {
    return response.data;
  })
  .catch((err) => {
    console.log(err);
  });
}

export function addPostApi(token,post){
  const url = `${basePath}/${apiVersion}/add-post`;
  return axios
  .post(url,post, {
    headers: { Accept: "application/json", Authorization: token },
  })
  .then((response) => {
    return response.data;
  })
  .catch((err) => {
    console.log(err);
  });
}

export function updatePostApi(token,id,post){
  const url = `${basePath}/${apiVersion}/update-post/${id}`;
  return axios
  .put(url,post, {
    headers: { Accept: "application/json", Authorization: token },
  })
  .then((response) => {
    return response.data;
  })
  .catch((err) => {
    console.log(err);
  });
}

export function getPostApi(urlPost){
  const url = `${basePath}/${apiVersion}/get-post/${urlPost}`;
  return axios
      .get(url)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err);
      });
}