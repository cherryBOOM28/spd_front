import axios from "axios";

export const deleteStaffInfo = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:8000/staff_info/delete/${id}/`
      
    );
    // console.log(response)

    return response;
  } catch (error) {
    console.log(error);
  }
};
