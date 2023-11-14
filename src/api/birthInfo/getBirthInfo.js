import axios from "axios";
import Cookies from "js-cookie";

export const getBirthInfo = async (id) => {

  try {
    const accessToken = Cookies.get('jwtAccessToken');
    // console.log(accessToken);
    const response = await axios.get(
      `http://localhost:8000/api/v1/birth-info/`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        }
      }
    );
    // console.log("response", response)

    return response;
  } catch (error) {
    console.log(error);
  }
};
