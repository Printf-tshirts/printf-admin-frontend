import axios from "axios";
import { LOCAL_BACKEND_URL } from "../../constants";

export default async function updateProductAPI(id, payload) {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axios.put(
      `${LOCAL_BACKEND_URL}/products/update-product?productId=${id}`,
      payload,
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
