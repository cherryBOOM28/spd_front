import axios from "axios";

export const getStaffInfo = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/staff_info/${id}/`
      
    );
    // console.log(response)

    return response;
  } catch (error) {
    console.log(error);
  }
};
