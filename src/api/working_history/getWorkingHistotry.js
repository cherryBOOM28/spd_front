import axios from "axios";

export const getWorkingHistory = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/working_history/get/${id}/`
      
    );
    // console.log(response)

    return response;
  } catch (error) {
    console.log(error);
  }
};
