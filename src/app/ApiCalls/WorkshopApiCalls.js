import axios from "axios";
import { url } from './ApiUrl'

const workshopApiUrl = `${url}/data/workshop`
const testimonialApiUrl = `${url}/data/stay/property`

export const postWorkshopCourse = async (Workshop) => {
    const adminId = JSON.parse(localStorage.getItem("userDetails"))._id;
    console.log(adminId)
    try {
        const response = await axios.post(`${workshopApiUrl}/add/${adminId}`, { Workshop })
        console.log(response)
        return response.success;
    }
    catch (error) {
        console.error(error)
    }
}

export const getWorkshopCourses = async () => {
    try {
        const response = await axios.get(`${workshopApiUrl}/all`)
        console.log(response)
        return response.data.data;
    }
    catch (error) {
        console.error(error)
    }
}

export const deleteWorkshopCourse = async (id) => {
    try {
        const response = await axios.delete(`${workshopApiUrl}/delete/${id}`)
        console.log(response)
        return response.data.success;
    }
    catch (error) {
        console.error(error)
    }
}

export const postWorkshopTestimonial = async (Workshop) => {
    // console.log(formData)
    const adminId = JSON.parse(localStorage.getItem("userDetails"))._id;
    console.log(adminId)
    try {
        const response = await axios.post(`${testimonialApiUrl}/add/${adminId}/workshop`, { Workshop })
        console.log(response)
        return response.success;
    } catch (error) {
        console.error(error)
    }
}

export const getWorkshopTestimonials = async () => {
    try {
        const response = await axios.get(`${testimonialApiUrl}/all`);
        console.log(response)
        return response.data.data;
    } catch (error) {
        console.error(error)
    }
}

export const deleteWorkshopTestimonial = async (testimonialId) => {
    try {
        const res = await axios.delete(`${testimonialApiUrl}/delete/${testimonialId}/workshop`)
        console.log(res.data)
        return res.data.success;
    } catch (error) {
        console.error(error)
    }
}