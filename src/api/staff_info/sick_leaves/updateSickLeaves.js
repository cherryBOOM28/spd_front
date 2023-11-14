import axios from "axios";

export const updateSickLeaves = async (id, updatedData) => {
  try {
    const response = await axios.patch(
      `http://localhost:8000/sick_leaves/${id}/`,
      updatedData
      
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
