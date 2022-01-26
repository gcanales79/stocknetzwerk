import { basePath, apiVersion } from "./config";
import axios from "axios";

export function signUpApi(data) {
  const url = `${basePath}/${apiVersion}/sign-up`;
  return axios
    .post(url, data)
    .then((response) => {
      //console.log(response)
      //console.log(response.data)
      if (response.data.user) {
        return {
          ok: true,
          message: "Usuario creado correctamente",
        };
      }
      return {
        ok: false,
        message: response.data.message,
      };
    })
    .catch((err) => {
      return {
        ok: false,
        message: err.data.message,
      };
    });
}

export function signInApi(data) {
  const url = `${basePath}/${apiVersion}/sign-in`;
  return axios
    .post(url, data)
    .then((response) => {
      //console.log(response)
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
}

export function getUsersApi(token) {
  const url = `${basePath}/${apiVersion}/users`;
  return axios
    .get(url, {
      headers: {
        Accept: "application/json",
        Authorization: token,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
}

export function getUsersActiveApi(token, status) {
  const url = `${basePath}/${apiVersion}/users-active?active=${status}`;
  return axios
    .get(url, {
      headers: {
        Accept: "application/json",
        Authorization: token,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
}

export function uploadAvatarApi(token, avatar, userId) {
  const url = `${basePath}/${apiVersion}/upload-avatar/${userId}`;
  //Para mandar archivos
  const formData = new FormData();
  formData.append("avatar", avatar, avatar.name);
  return axios
    .put(url, formData, {
      headers: { Accept: "application/json", Authorization: token },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
}

export function getAvatarApi(avatarName) {
  const url = `${basePath}/${apiVersion}/get-avatar/${avatarName}`;
  return fetch(url)
    .then((response) => {
      //console.log(response)
      return response.url;
    })
    .catch((err) => {
      return err;
    });
}

export function updateUserApi(token, user, userId) {
  //console.log(token)
  const url = `${basePath}/${apiVersion}/update-user/${userId}`;
  return axios
    .put(url, user, {
      headers: { Accept: "application/json", Authorization: token },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
}

export function activateUserApi(token, userId, status) {
  const url = `${basePath}/${apiVersion}/activate-user/${userId}`;
  return axios
    .put(url, status, {
      headers: { Accept: "application/json", Authorization: token },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
}

export function deleteUserApi(token, userId) {
  const url = `${basePath}/${apiVersion}/delete-user/${userId}`;
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

export function signUpAdminApi(token, data) {
  const url = `${basePath}/${apiVersion}/sign-up-admin`;
  return axios
    .post(url, data, {
      headers: { Accept: "application/json", Authorization: token },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
}
