import axios from "axios";
import { LOCAL_BACKEND_URL } from "../../constants";

export const addProductAPI = (payload) => {
  const token = sessionStorage.getItem("token");
  return axios.post(`${LOCAL_BACKEND_URL}/products/add-product`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
