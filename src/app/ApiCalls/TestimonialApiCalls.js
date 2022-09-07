import axios from "axios";

const homeApiURL = 'http://localhost:4001/api/data/homepage/testimonials'

export const postTestimonial = async (category, name, content, designation) => {
    const authId = JSON.parse(localStorage.getItem("userDetails"))._id;
    console.log(authId)
    try {
        const response = axios.post(`${homeApiURL}/add/${authId}`, {
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
        const response = axios.get(`${homeApiURL}/all/`);
        return response.data;
    } catch (error) {
        console.error(error)
    }
}

export const deleteTestimonial = async (testimonialId) => {
    try {
        return axios.delete(`${homeApiURL}/delete/${testimonialId}`)
    } catch (error) {
        console.error(error)
    }
}