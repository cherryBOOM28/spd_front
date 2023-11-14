import axios from "axios";

export const deleteCourse = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:8000/courses/${id}/`
      
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
