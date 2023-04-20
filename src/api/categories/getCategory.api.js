import axios from "axios";

export const getCategoriesAPI = () => {
  const token = sessionStorage.getItem("token");
  return axios.get(
    `${process.env.REACT_APP_LOCAL_BACKEND_URL}/categories/get-categories`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
