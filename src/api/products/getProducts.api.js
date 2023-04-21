import axios from "axios";
import { LOCAL_BACKEND_URL } from "../../constants";

export const getProductsAPI = (payload) => {
  const token = sessionStorage.getItem("token");
  return axios.get(
    `${LOCAL_BACKEND_URL}/products/get-products?skip=${payload.skip}&limit=${payload.limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
