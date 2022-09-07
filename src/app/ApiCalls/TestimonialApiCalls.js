import axios from "axios";

const homeApiURL = 'http://localhost:4001/api/data/homepage/testimonials'

export const postTestimonial = async (category, name, content, designation) => {
    const authId = JSON.parse(localStorage.getItem("userDetails"))._id;
    console.log(authId)
    try {
        return axios.post(`${homeApiURL}/add/${authId}`, {
            category,
            name,
            content,
            designation
        })
    } catch (error) {
        console.error(error)
    }

}

export const getHomeTestimonials = async () => {
    try {
        return axios.get(`${homeApiURL}/all/`)
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