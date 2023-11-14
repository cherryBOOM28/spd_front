import axios from "axios";

export const updateAttestations = async (id, updatedData) => {
  try {
    const response = await axios.patch(
      `http://localhost:8000/attestation/${id}/`,
      updatedData
      
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
