import axios from "axios";
import { url } from './ApiUrl'

const libApiUrl = `${url}/data/library`

export const postLibraryBook = async (Library) => {
    // console.log(formData)
    const adminId = JSON.parse(localStorage.getItem("userDetails"))._id;
    console.log(adminId)
    try {
        const response = await axios.post(`${libApiUrl}/add/${adminId}`, { Library })
        console.log(response)
        return response.success;
    } catch (error) {
        console.error(error)
    }

}

export const getLibraryBooks = async () => {
    try {
        const response = await axios.get(`${libApiUrl}/all`);
        console.log(response)
        return response.data.data;
    } catch (error) {
        console.error(error)
    }
}

export const deleteLibraryBook = async (id) => {
    try {
        const res = await axios.delete(`${libApiUrl}/delete/${id}`)
        console.log(res.data)
        return res.data.success;
    } catch (error) {
        console.error(error)
    }
}