import axios from "axios";

export const getPhotos = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/photos/${id}`
      
    );
    // console.log(response)

    return response;
  } catch (error) {
    console.log(error);
  }
};
