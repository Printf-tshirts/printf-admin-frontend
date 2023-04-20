import axios from "axios";

export const getVariantsAPI = (payload) => {
  const token = sessionStorage.getItem("token");
  return axios.get(
    `${process.env.REACT_APP_LOCAL_BACKEND_URL}/variants/get-variants?skip=${payload.skip}&limit=${payload.limit}&productId=${payload.productId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
