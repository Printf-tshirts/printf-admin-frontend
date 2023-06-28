import axios from "axios";
import { LOCAL_BACKEND_URL } from "../../constants";

export const addColorAPI = (payload) => {
  const token = sessionStorage.getItem("token");
  return axios.post(`${LOCAL_BACKEND_URL}/colors/add-color`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
