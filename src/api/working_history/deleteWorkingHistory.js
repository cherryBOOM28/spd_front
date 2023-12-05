import axios from "axios";
import Cookies from "js-cookie";

const accessToken = Cookies.get('jwtAccessToken');
// console.log('Access Token:', accessToken);

export const deleteWorkingHistory = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:8000/api/v1/working-history/${id}/`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        }
      }
      
    );
    console.log("working", response.data)

    return response.data; // Возвращаем обновленные данные после удаления
  } catch (error) {
    console.log(error);
    throw error;
  }
};
