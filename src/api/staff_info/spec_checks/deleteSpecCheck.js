import axios from "axios";

export const deleteSpecCheck = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:8000/spec_check/${id}/`
      
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
