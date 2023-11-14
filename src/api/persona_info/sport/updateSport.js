import axios from "axios";

export const updateSport = async (id, updatedData) => {
  try {
    const response = await axios.patch(
      `http://localhost:8000/sport_results/${id}/`,
      updatedData
      
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
