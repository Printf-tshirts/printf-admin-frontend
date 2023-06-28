import axios from "axios";
import { LOCAL_BACKEND_URL } from "../../constants";

export const getAllColorsAPI = () => {
  const token = sessionStorage.getItem("token");
  return axios.get(`${LOCAL_BACKEND_URL}/colors/get-all-colors`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
