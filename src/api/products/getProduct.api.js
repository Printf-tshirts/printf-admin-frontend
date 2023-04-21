import axios from "axios";
import { LOCAL_BACKEND_URL } from "../../constants";

export const getProductAPI = ({ productId }) => {
  const token = sessionStorage.getItem("token");
  return axios.get(
    `${LOCAL_BACKEND_URL}/products/get-product?productId=${productId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
