import axios from "axios";
import { LOCAL_BACKEND_URL } from "../../constants";

export const getVariantsAPI = (payload) => {
  const token = sessionStorage.getItem("token");
  return axios.get(
    `${LOCAL_BACKEND_URL}/variants/get-variants?skip=${payload.skip}&limit=${payload.limit}&productId=${payload.productId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
