import axios from "axios";
import { LOCAL_BACKEND_URL } from "../../constants";

export const uploadFileAPI = (payload) => {
  const token = sessionStorage.getItem("token");
  return axios.post(`${LOCAL_BACKEND_URL}/files/upload`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
    data: payload,
  });
};
