import axios from "axios";
import { LOCAL_BACKEND_URL } from "../../constants";

export const addCouponAPI = (payload) => {
  const token = sessionStorage.getItem("token");
  return axios.post(`${LOCAL_BACKEND_URL}/coupons/add-coupon`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
