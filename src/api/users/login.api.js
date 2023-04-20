import axios from "axios";
export const loginAPI = (email, password) => {
  return axios.post(`${process.env.REACT_APP_LOCAL_BACKEND_URL}/users/login`, {
    email,
    password,
  });
};
