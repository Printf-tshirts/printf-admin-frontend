import axios from "axios";

export const getProductAPI = ({ productId }) => {
  const token = sessionStorage.getItem("token");
  return axios.get(
    `${process.env.REACT_APP_LOCAL_BACKEND_URL}/products/get-product?productId=${productId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
