import axios from "axios";
import { url } from './ApiUrl'

const expApiURL = `${url}/data/experience`

export const postExperienceTestimonial = async (Experience) => {
    // console.log(formData)
    const adminId = JSON.parse(localStorage.getItem("userDetails"))._id;
    console.log(adminId)
    try {
        const response = await axios.post(`${expApiURL}/add/${adminId}`, { Experience })
        console.log(response)
        return response.success;
    } catch (error) {
        console.error(error)
    }

}

export const getExperienceTestimonials = async () => {
    try {
        const response = await axios.get(`${expApiURL}/all`);
        console.log(response)
        return response.data.data;
    } catch (error) {
        console.error(error)
    }
}

export const deleteExperienceTestimonial = async (testimonialId) => {
    try {
        const res = await axios.delete(`${expApiURL}/delete/${testimonialId}`)
        console.log(res.data)
        return res.data.success;
    } catch (error) {
        console.error(error)
    }
}