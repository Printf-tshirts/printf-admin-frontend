import axios from "axios";
import { LOCAL_BACKEND_URL } from "../../constants";

export const getAllOrdersAPI = (payload) => {
  const token = sessionStorage.getItem("token");
  return axios.get(
    `${LOCAL_BACKEND_URL}/orders/get-all-orders?skip=${payload.skip}&limit=${payload.limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
