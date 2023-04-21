import axios from "axios";
import { LOCAL_BACKEND_URL } from "../../constants";

export const getCategoriesAPI = () => {
  const token = sessionStorage.getItem("token");
  return axios.get(`${LOCAL_BACKEND_URL}/categories/get-categories`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
