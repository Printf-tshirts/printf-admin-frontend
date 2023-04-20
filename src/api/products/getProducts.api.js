import axios from "axios";

export const getProductsAPI = (payload) => {
  const token = sessionStorage.getItem("token");
  return axios.get(
    `${process.env.REACT_APP_LOCAL_BACKEND_URL}/products/get-products?skip=${payload.skip}&limit=${payload.limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
