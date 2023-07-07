import axios from "axios";
import { LOCAL_BACKEND_URL } from "../../constants";

export default async function deleteProductAPI({ id }) {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axios.delete(
      `${LOCAL_BACKEND_URL}/products/delete-product?productId=${id}`,
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
