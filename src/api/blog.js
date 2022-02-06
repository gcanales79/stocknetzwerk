// import { basePath, apiVersion } from "./config";
import axios from "axios";

export function getBlogsApi(limit,page){
    const url = `https://netzwerk.mx/get-posts?page=${page}&limit=${limit}`;
    return axios
      .get(url,{
        headers: { Accept: "application/json", Origin: "http://104.248.125.58" },
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err);
      });
}

export function getBlogApi(blogUrl){
  const url = `https://netzwerk.mx/get-post/${blogUrl}`;
  return axios
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
}