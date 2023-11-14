import axios from "axios";

export const getGeneralInfo = async (id) => {
  try {
    // console.log(id);
    const response = await axios.get(
      `http://localhost:8000/general_info/${id}/`
    );
    // console.log(response);
    // console.log(response.data);

    return response;
  } catch (error) {
    console.log("General info: ", error);
    throw error;
  }
};
