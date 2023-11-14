import axios from "axios";

export const deleteEducation = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:8000/education/${id}/`
      
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
