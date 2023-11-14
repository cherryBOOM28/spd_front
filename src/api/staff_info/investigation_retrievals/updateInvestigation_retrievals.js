import axios from "axios";

export const updateInvestigation_retrievals = async (id, updatedData) => {
  try {
    const response = await axios.patch(
      `http://localhost:8000/investigation_retrieval/${id}/`,
      updatedData
      
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
