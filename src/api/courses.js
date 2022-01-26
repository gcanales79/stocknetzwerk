import { basePath, apiVersion } from "./config";
import axios from "axios";

export function getCoursesApi() {
  const url = `${basePath}/${apiVersion}/get-courses`;
  return axios
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
}

export function getDataUdemyApi(id) {
  const baseUrl = `https://www.udemy.com/api-2.0/courses/${id}/`;
  const coursesParams =
    "?fields[course]=title,headline,url,price,image_480x270";
  const url = baseUrl + coursesParams;
  return fetch(url)
    .then(async (response) => {
      return { code: response.status, data: await response.json() };
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function deleteCourseApi(token, id) {
  const url = `${basePath}/${apiVersion}/delete-course/${id}`;
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

export function addCourseApi(token,course){
  const url = `${basePath}/${apiVersion}/add-course`;
  return axios
    .post(url,course, {
      headers: { Accept: "application/json", Authorization: token },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
}

export function updateCourseApi(token,id, course){
  const url = `${basePath}/${apiVersion}/update-course/${id}`;
  return axios
    .put(url,course, {
      headers: { Accept: "application/json", Authorization: token },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
}


