import axios from "axios";

export const updatePersonalInfo = async (id) => {
  try {
    const response = await axios.patch(
      `http://localhost:8000/personal_info/update/${id}/`
      
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};
