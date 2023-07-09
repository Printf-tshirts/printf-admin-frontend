import axios from "axios";
import { LOCAL_BACKEND_URL } from "../../constants";

export const addDesignTypeAPI = (payload) => {
  const token = sessionStorage.getItem("token");
  return axios.post(
    `${LOCAL_BACKEND_URL}/design-types/add-design-type`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
