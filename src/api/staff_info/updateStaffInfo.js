import axios from "axios";

export const updateStaffInfo = async (id) => {
  try {
    const response = await axios.patch(
      `http://localhost:8000/staff_info/update/${id}/`
      
    );
    // console.log(response)

    return response;
  } catch (error) {
    console.log(error);
  }
};
