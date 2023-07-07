import axios from "axios";
import { LOCAL_BACKEND_URL } from "../../constants";

export default async function deleteVariantAPI({ id }) {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axios.delete(
      `${LOCAL_BACKEND_URL}/variants/delete-variant?variantId=${id}`,
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
