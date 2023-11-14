import axios from "axios";

export const deleteSport = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:8000/sport_results/${id}/`
      
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
