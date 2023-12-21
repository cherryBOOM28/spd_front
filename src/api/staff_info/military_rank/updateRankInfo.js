import axios from "axios";
import Cookies from "js-cookie";


export const updateRankInfo = async (id, updatedRankInfo) => {
  try {
    const accessToken = Cookies.get('jwtAccessToken');
    const response = await axios.patch(
      `http://localhost:8000/api/v1/rank-info/${id}/`,
      updatedRankInfo, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        }
      }
      
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};
