import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
//const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user)?.currentUser?.accessToken;

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;
export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
