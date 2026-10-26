import axios from "axios";
const API = axios.create({
  baseURL: "http://localhost:5000/api/users",
  withCredentials: true,
});
export interface RegisterData {
  username: string;
  email: string;
  password: string;
}
export interface LoginData {
  email: string;
  password: string;
}
export const registerUser = (data: RegisterData) => {
  return API.post("/register", data);
};
export const loginUser = (data: LoginData) => {
  return API.post("/login", data);
};
