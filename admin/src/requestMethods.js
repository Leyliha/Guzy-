import axios from "axios";

const BASE_URL = "http://localhost:5000/";

export const publicRequest = axios.create({
  baseURL: process.env.PUBLIC_URL || BASE_URL,
});
//const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user)?.currentUser?.accessToken;

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;
export const userRequest = axios.create({
  baseURL: process.env.PUBLIC_URL || BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
