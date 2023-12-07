import axios from "axios";
import Cookies from "js-cookie";

const accessToken = Cookies.get('jwtAccessToken');

export const updateSport = async (id, updatedData) => {
  try {
    const response = await axios.patch(
      `http://localhost:8000/api/v1/sport-skill/${id}/`,
      updatedData, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        }
      }
      
    );
    // console.log(response)

    return response;
  } catch (error) {
    console.log(error);
  }
};
