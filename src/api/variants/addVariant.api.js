import axios from "axios";

export const addVariantAPI = (payload) => {
  const token = sessionStorage.getItem("token");
  return axios.post(
    `${process.env.REACT_APP_LOCAL_BACKEND_URL}/variants/add-variant`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
