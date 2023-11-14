import axios from "axios";

export const updateEducation = async (id, updatedData) => {
  try {
    const response = await axios.patch(
      `http://localhost:8000/education/${id}/`,
      updatedData
      
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
