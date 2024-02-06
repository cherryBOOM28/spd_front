import axios from "axios";
import Cookies from "js-cookie";

// const accessToken = Cookies.get('jwtAccessToken');

// export const UpdateWorkingHistory = async (id, updatedData) => {
//   try {
//   const accessToken = Cookies.get('jwtAccessToken');
//     const response = await axios.patch(
//       `http://localhost:8000/api/v1/working-history/${id}/`,
//       updatedData, {
//         headers: {
//           'Authorization': `Bearer ${accessToken}`,
//         }
//       }
      
//     );
//     // console.log("response aooaoao", response)

//     return response;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };


export const UpdateWorkingHistory = async (id, updatedData) => {
  try {
    console.log("Обновленные данные:", updatedData);

      const accessToken = Cookies.get('jwtAccessToken');
      const response = await axios.patch(
          `http://localhost:8000/api/v1/working-history/${id}/`,
          JSON.stringify(updatedData), // Преобразуем объект updatedData в формат JSON
          {
              headers: {
                  'Authorization': `Bearer ${accessToken}`,
                  'Content-Type': 'application/json', // Указываем тип содержимого как JSON
              }
          }
      );

      console.log("Response from server:", response);
      return response;
  } catch (error) {
      console.error('Error updating table data:', error);
      throw error;
  }
};
