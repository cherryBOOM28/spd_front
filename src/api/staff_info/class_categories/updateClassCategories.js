import axios from "axios";

export const updateClassCategories = async (id, updatedData) => {
  try {
    const response = await axios.patch(
      `http://localhost:8000/class_category/${id}/`,
      updatedData
      
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
