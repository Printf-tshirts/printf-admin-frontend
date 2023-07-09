import axios from "axios";
import { LOCAL_BACKEND_URL } from "../../constants";

export const getAllDesignTypesAPI = () => {
  const token = sessionStorage.getItem("token");
  return axios.get(`${LOCAL_BACKEND_URL}/design-types/get-all-design-types`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
