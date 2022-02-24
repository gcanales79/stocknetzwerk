import { basePath, apiVersion } from "./config";
import axios from "axios";

export function getCallsApi(limit,page,token){
    const url = `${basePath}/${apiVersion}/get-calls?limit=${limit}&page=${page}`;
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

export function deleteCallApi(token,id){
    const url = `${basePath}/${apiVersion}/delete-call/${id}`;
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