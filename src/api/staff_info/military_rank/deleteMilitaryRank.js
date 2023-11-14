import axios from "axios";

export const deleteMilitaryRank = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:8000/military_rank/${id}/`
      
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
