import axios from "axios";

export const addProductAPI = (payload) => {
  const token = sessionStorage.getItem("token");
  return axios.post(
    `${process.env.REACT_APP_LOCAL_BACKEND_URL}/products/add-product`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
