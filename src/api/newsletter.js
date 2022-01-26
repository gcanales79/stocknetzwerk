import { basePath, apiVersion } from "./config";
import axios from "axios";

export function suscribeNewsletterApi(email){
    const url = `${basePath}/${apiVersion}/suscribe-newsletter/${email.toLowerCase()}`;
    return axios.post(url
        ).then((response)=>{
          return response.data
      }).catch((err)=>{
          console.log(err)
      })

}