import axios from "axios";

export const updateAward = async (id, updatedData) => {
  try {
    const response = await axios.patch(
      `http://localhost:8000/awards/${id}/`,
      updatedData
      
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
