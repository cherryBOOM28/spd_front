import axios from "axios";

export const deleteGeneralInfo = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:3001/general_info/${id}`)
        return response
    } catch (error) {
        console.log("Smth wrong: ", error)
    }
};