import axios from 'axios';

export const putGeneralInfo = async (id, editedDataCourse) => {
  try {
    const response = await axios.patch(`http://localhost:3001/general_info/${id}`, editedDataCourse);
    return response;

  } catch (error) {
    console.error('Error updating general info:', error);
    throw error;
  }
};
