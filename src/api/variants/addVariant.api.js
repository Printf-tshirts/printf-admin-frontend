import axios from "axios";
import { LOCAL_BACKEND_URL } from "../../constants";

export const addVariantAPI = (payload) => {
  const token = sessionStorage.getItem("token");
  return axios.post(`${LOCAL_BACKEND_URL}/variants/add-variant`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
