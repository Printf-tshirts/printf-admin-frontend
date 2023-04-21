import axios from "axios";
import { LOCAL_BACKEND_URL } from "../../constants";

export const getUserAPI = () => {
  const token = sessionStorage.getItem("token");
  return axios.get(`${LOCAL_BACKEND_URL}/users/get-user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
