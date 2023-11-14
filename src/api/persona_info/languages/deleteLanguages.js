import axios from "axios";

export const deleteLanguages = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:8000/owning_languages/${id}/`
      
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
