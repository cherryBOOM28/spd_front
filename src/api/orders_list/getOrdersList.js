import axios from "axios";

export const getOrdersList = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/orders_list/get/${id}/`
      
    );
    // console.log(response)

    return response;
  } catch (error) {
    console.log(error);
  }
};
