import axios from "axios";

export const deleteWorkingHistory = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:8000/working_history/delete/${id}/`
      
    );
    console.log(response)

    return response;
  } catch (error) {
    console.log(error);
  }
};
