import axios from "axios";

export const updateMilitaryRank = async (id, updatedData) => {
  try {
    const response = await axios.patch(
      `http://localhost:8000/military_rank/${id}/`,
      updatedData
      
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
