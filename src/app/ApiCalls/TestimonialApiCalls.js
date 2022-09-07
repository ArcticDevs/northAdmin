import axios from "axios";
import {url} from './ApiUrl'

const homeApiURL = `${url}/data/homepage/testimonials`

export const postTestimonial = async (category, name, content, designation) => {
    const authId = JSON.parse(localStorage.getItem("userDetails"))._id;
    console.log(authId)
    try {
        const response = await axios.post(`${homeApiURL}/add/${authId}`, {
            category,
            name,
            content,
            designation
        })
        return response.data;
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
        return await axios.delete(`${homeApiURL}/delete/${testimonialId}`)
    } catch (error) {
        console.error(error)
    }
}