import axios from "axios";

export const deleteInvestigation_retrievals = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:8000/investigation_retrieval/${id}/`
      
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
