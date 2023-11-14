import axios from "axios";

export const deleteAcademicDegree = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:8000/academic_degree/${id}/`
      
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
