import axios from "axios";

export const UpdateWorkingHistory = async (id, updatedData) => {
  try {
    const response = await axios.patch(
      `http://localhost:8000/working_history/update/${id}/`,
      updatedData
      
    );
    // console.log(response)

    return response;
  } catch (error) {
    console.log(error);
  }
};
