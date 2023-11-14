import axios from "axios";

export const deletePersonalInfo = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:8000/personal_info/delete/${id}/`
      
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
