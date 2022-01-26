import { basePath, apiVersion } from "./config";
import axios from "axios";

export function getMenuApi(){
    const url = `${basePath}/${apiVersion}/get-menus`;
    return axios.get(url).then((response)=>{
        return response.data
    }).catch((err)=>{
        console.log(err)
    })
}

export function updateMenuApi(token,menuId,data){
    const url = `${basePath}/${apiVersion}/update-menu/${menuId}`;
    return axios.put(url,data, {
        headers: { Accept: "application/json", Authorization: token },
      }).then((response)=>{
          return response.data
      }).catch((err)=>{
          console.log(err)
      })
    
}

export function activateMenuApi(token,menuId,status){
    const url = `${basePath}/${apiVersion}/activate-menu/${menuId}`;
    return axios.put(url,status,{
        headers: { Accept: "application/json", Authorization: token },
      }).then((response)=>{
          return response.data
      }).catch((err)=>{
          console.log(err)
      })
}

export function addMenuApi(token,menu){
    const url = `${basePath}/${apiVersion}/add-menu/`;
    return axios.post(url,menu,{
        headers: { Accept: "application/json", Authorization: token },
      }).then((response)=>{
          return response.data
      }).catch((err)=>{
          console.log(err)
      })
}

export function deleteMenuApi(token,menuId){
    const url = `${basePath}/${apiVersion}/delete-menu/${menuId}`;
    return axios.delete(url,{
        headers: { Accept: "application/json", Authorization: token },
      }).then((response=>{
          return response.data
      })).catch((err)=>{
          console.log(err)
      })
}