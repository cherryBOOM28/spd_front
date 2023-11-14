import axios from "axios";

export const getPersonalInfo = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/personal_info/${id}/`
      
    );
    // console.log(response)

    return response;
  } catch (error) {
    console.log(error);
  }
};
