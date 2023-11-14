import axios from "axios";

export const deleteSickLeaves = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:8000/sick_leaves/${id}/`
      
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
