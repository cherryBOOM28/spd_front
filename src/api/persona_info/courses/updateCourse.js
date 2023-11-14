import axios from "axios";

export const updateCourse = async (id, updatedData) => {
  try {
    const response = await axios.patch(
      `http://localhost:8000/courses/${id}/`,
      updatedData
      
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
