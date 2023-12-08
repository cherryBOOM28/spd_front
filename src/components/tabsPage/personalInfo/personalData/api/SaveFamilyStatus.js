import axios from "axios";
import Cookies from "js-cookie";

const updateFamilyStatus = async(id, statusName) => {
    try {
        const accessToken = Cookies.get('jwtAccessToken');
        const response = await axios.patch(`http://localhost:8000/api/v1/position/${id}/`, {
            statusName,
        }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        })

        if(!response.status === 200) {
            throw new Error("Ошибка при сохранении семейного положения")
        }
        console.log('Данные семейного положения успешно сохранены');
    } catch (error) {
        console.error('Ошибка при сохранении семейного положения:', error.message);
        throw error;
    }
};

export default updateFamilyStatus;