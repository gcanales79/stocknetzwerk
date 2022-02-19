import { basePath, apiVersion } from "./config";
import axios from "axios";

export function getTrackingsApi(limit,page){
    const url = `${basePath}/${apiVersion}/get-all-tracking?limit=${limit}&page=${page}`;
    return axios
      .get(url)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err);
      });
}

export function deleteTrackingApi(token,id){
  const url = `${basePath}/${apiVersion}/delete-track/${id}`;
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

export function addTrackingApi(token,tweet){
  const url = `${basePath}/${apiVersion}/add-track`;
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

export function updateTrackingApi(token,id,tweet){
  const url = `${basePath}/${apiVersion}/update-track/${id}`;
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