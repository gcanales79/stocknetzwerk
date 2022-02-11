import { basePath, apiVersion } from "./config";
import axios from "axios";

export function getTweetsApi(limit,page){
    const url = `${basePath}/${apiVersion}/get-tweets?limit=${limit}&page=${page}`;
    return axios
      .get(url)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err);
      });
}

export function deleteTweetApi(token,id){
    const url = `${basePath}/${apiVersion}/delete-tweet/${id}`;
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

  export function addTweetApi(token,tweet){
    const url = `${basePath}/${apiVersion}/add-tweet`;
    return axios
    .post(url,tweet, {
      headers: { Accept: "application/json", Authorization: token },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
  }
  
  export function updateTweetApi(token,id,tweet){
    const url = `${basePath}/${apiVersion}/update-tweet/${id}`;
    return axios
    .put(url,tweet, {
      headers: { Accept: "application/json", Authorization: token },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
  }