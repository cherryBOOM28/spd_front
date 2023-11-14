import axios from "axios";

export const deleteAttestations = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:8000/attestation/${id}/`
      
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
