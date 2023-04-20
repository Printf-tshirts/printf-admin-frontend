import axios from "axios";

export default async function updateStatusAPI({ id, status }) {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axios.put(
      `${process.env.REACT_APP_LOCAL_BACKEND_URL}/products/update-status?productId=${id}`,
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
