import axios from "axios";

export const updateSpecCheck = async (id, updatedData) => {
  try {
    const response = await axios.patch(
      `http://localhost:8000/spec_check/${id}/`,
      updatedData
      
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
