import axios from "axios";
import { url } from './ApiUrl'

const homeApiURL = `${url}/data/homepage/testimonials`

export const postTestimonial = async (category, name, content, designation) => {
    // console.log(formData)
    const adminId = JSON.parse(localStorage.getItem("userDetails"))._id;
    console.log(adminId)
    try {
        const response = await axios.post(`${homeApiURL}/add/${adminId}`, { category, name, content, designation })
        console.log(response)
        return response.success;
    } catch (error) {
        console.error(error)
    }

}

export const getHomeTestimonials = async () => {
    try {
        const response = await axios.get(`${homeApiURL}/all`);
        console.log(response)
        return response.data.data;
    } catch (error) {
        console.error(error)
    }
}

export const deleteTestimonial = async (testimonialId) => {
    try {
        const res = await axios.delete(`${homeApiURL}/delete/${testimonialId}`)
        console.log(res.data)
        return res.data.success;
    } catch (error) {
        console.error(error)
    }
}