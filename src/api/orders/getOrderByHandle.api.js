import axios from "axios";
import { LOCAL_BACKEND_URL } from "../../constants";

export const getOrderByHandleAPI = ({ handle }) => {
  const token = sessionStorage.getItem("token");
  return axios.get(
    `${LOCAL_BACKEND_URL}/orders/get-order-by-handle/${handle}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
