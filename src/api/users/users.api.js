import axios from "axios";

export const getUserAPI = () => {
  const token = sessionStorage.getItem("token");
  return axios.get(
    `${process.env.REACT_APP_LOCAL_BACKEND_URL}/users/get-user`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
