import axios from "axios";

export const deleteFamilyCompositions = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:8000/family_composition/${id}/`
      
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
