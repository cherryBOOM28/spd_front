import axios from "axios";

export const updateOrdersList = async (id, updatedData) => {
  try {
    const response = await axios.patch(
      `http://localhost:8000/orders_list/update/${id}/`,
      updatedData
    );
    // console.log(response)

    return response;
  } catch (error) {
    console.log(error);
  }
};
