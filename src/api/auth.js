import { basePath, apiVersion } from "./config";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../utils/constants";
import jwt_decode from "jwt-decode";
import axios from "axios";

export function getAccessTokenApi() {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  if (!accessToken || accessToken === "null") {
    return null;
  }

  return willExpireToken(accessToken) ? null : accessToken;
}

export function getRefreshTokenApi() {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);
  if (!refreshToken || refreshToken === "null") {
    return null;
  }

  return willExpireToken(refreshToken) ? null : refreshToken;
}

export function refreshAccessTokenApi(token) {
  const url = `${basePath}/${apiVersion}/refresh-access-token`;
  const bodyObj = {
    refreshToken: token,
  };
  axios.post(url, bodyObj).then((response) => {
    if (response.data.code !== "200") {
      logout();
    } else {
      const { accessToken, refreshToken } = response.data;
      localStorage.setItem(ACCESS_TOKEN, accessToken);
      localStorage.setItem(REFRESH_TOKEN, refreshToken);
    }
  });
}

export function logout() {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
}

function willExpireToken(token) {
  const seconds = 60;
  const metaToken = jwt_decode(token);
  const { exp } = metaToken;
  const now = (Date.now() + seconds) / 1000;
  return now > exp;
}
