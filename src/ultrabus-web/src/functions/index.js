import { apiClient } from "../configs/api-client";

export function getToken() {
  return localStorage.getItem("token") || "";
}

export function setToken(token) {
  localStorage.setItem("token", token);
}

export const fetcher = (url) => apiClient.get(url).then((res) => res.data.data);
