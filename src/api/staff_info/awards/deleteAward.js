import axios from "axios";

export const deleteAward = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:8000/awards/${id}/`
      
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
