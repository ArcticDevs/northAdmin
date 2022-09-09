import axios from "axios";
import { url } from './ApiUrl'

const pressApiUrl = `${url}/data/press`

export const postPressData = async (Press) => {
    // console.log(formData)
    const adminId = JSON.parse(localStorage.getItem("userDetails"))._id;
    console.log(adminId)
    try {
        const response = await axios.post(`${pressApiUrl}/add/${adminId}`, { Press })
        console.log(response)
        return response.data;
    } catch (error) {
        console.error(error)
    }

}

export const getPressData = async () => {
    try {
        const response = await axios.get(`${pressApiUrl}/all`);
        console.log(response)
        return response.data.data;
    } catch (error) {
        console.error(error)
    }
}

export const deletePressData = async (id) => {
    try {
        const res = await axios.delete(`${pressApiUrl}/delete/${id}`)
        console.log(res.data)
        return res.data.success;
    } catch (error) {
        console.error(error)
    }
}