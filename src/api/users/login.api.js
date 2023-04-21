import axios from "axios";
import { LOCAL_BACKEND_URL } from "../../constants";
export const loginAPI = (email, password) => {
  return axios.post(`${LOCAL_BACKEND_URL}/users/login`, {
    email,
    password,
  });
};
