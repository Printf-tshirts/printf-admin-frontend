import axios from "axios";
import { LOCAL_BACKEND_URL } from "../../constants";

export const getAllCouponsAPI = () => {
  const token = sessionStorage.getItem("token");
  return axios.get(`${LOCAL_BACKEND_URL}/coupons/get-all-coupons`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
