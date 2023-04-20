import axios from "axios";

export const uploadFileAPI = (payload) => {
  const token = sessionStorage.getItem("token");
  return axios.post(`${process.env.REACT_APP_LOCAL_BACKEND_URL}/files/upload`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
    data: payload,
  });
};
