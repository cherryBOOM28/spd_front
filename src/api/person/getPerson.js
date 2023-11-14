import axios from "axios";
import Cookies from "js-cookie";

export const getPerson = async (id) => {

  try {
    const accessToken = Cookies.get('jwtAccessToken');
    // console.log(accessToken);
    const response = await axios.get(
      `http://localhost:8000/api/v1/person/${id}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        }
      }
    );
    console.log("response", response)

    return response;
  } catch (error) {
    console.log(error);
  }
};
