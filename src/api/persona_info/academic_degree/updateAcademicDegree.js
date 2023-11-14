import axios from "axios";

export const updateAcademicDegree = async (id, updatedData) => {
  try {
    const response = await axios.patch(
      `http://localhost:8000/academic_degree/${id}/`,
      updatedData
      
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
