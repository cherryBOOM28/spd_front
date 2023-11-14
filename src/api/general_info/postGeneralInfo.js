import axios from 'axios';

export const postGeneralInfo = async (id, editedDataCourse) => {
  try {
    const response = await axios.post(`http://localhost:3001/general_info/${id}`, editedDataCourse);
    return response;

  } catch (error) {
    console.error(error);
    throw error;
  }
};
