import axios from "axios";

export const deleteOrdersList = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:8000/orders_list/delete/${id}/`
      
    );
    // console.log(response)

    return response;
  } catch (error) {
    console.log(error);
  }
};
