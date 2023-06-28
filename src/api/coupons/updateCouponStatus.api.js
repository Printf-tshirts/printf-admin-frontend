import axios from "axios";
import { LOCAL_BACKEND_URL } from "../../constants";

export default async function updateStatusAPI({ id, status }) {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axios.put(
      `${LOCAL_BACKEND_URL}/coupons/update-status?couponId=${id}`,
      { status: status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}
