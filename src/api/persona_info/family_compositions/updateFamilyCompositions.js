import axios from "axios";

export const updateFamilyCompositions = async (id, updatedData) => {
  try {
    const response = await axios.patch(
      `http://localhost:8000/family_composition/${id}/`,
      updatedData
      
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
