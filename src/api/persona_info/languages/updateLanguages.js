import axios from "axios";

export const updateLanguages = async (id, updatedData) => {
  try {
    const response = await axios.patch(
      `http://localhost:8000/owning_languages/${id}/`,
      updatedData
      
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
