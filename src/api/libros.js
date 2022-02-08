import axios from "axios";

export function getBooksApi(limit,page){
    const url = `https://netzwerk.mx/get-all-books?page=${page}&limit=${limit}`;
    return axios
      .get(url)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err);
      });
}