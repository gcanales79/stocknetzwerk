import { basePath, apiVersion } from "./config";
import axios from "axios";

export function getBirthdaysApi(limit,page,token){
    const url = `${basePath}/${apiVersion}/get-all-bdays?limit=${limit}&page=${page}`;
    return axios
      .get(url,{
        headers: { Accept: "application/json", Authorization: token },
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err);
      });
}

export function deleteBirthdayApi(token,id){
    const url = `${basePath}/${apiVersion}/delete-bday/${id}`;
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

  export function addBirthdayApi(token,bday){
  const url = `${basePath}/${apiVersion}/add-bday`;
  return axios
  .post(url,bday, {
    headers: { Accept: "application/json", Authorization: token },
  })
  .then((response) => {
    return response.data;
  })
  .catch((err) => {
    console.log(err);
  });
}

export function updateBirthdayApi(token,id,bday){
  const url = `${basePath}/${apiVersion}/update-bday/${id}`;
  return axios
  .put(url,bday, {
    headers: { Accept: "application/json", Authorization: token },
  })
  .then((response) => {
    return response.data;
  })
  .catch((err) => {
    console.log(err);
  });
}