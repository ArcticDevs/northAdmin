import axios from "axios";
import { url } from './ApiUrl'

const stayApiURL = `${url}/data/stay/property`

export const postStayTestimonial = async (StayProperty) => {
    // console.log(formData)
    const adminId = JSON.parse(localStorage.getItem("userDetails"))._id;
    console.log(adminId)
    try {
        const response = await axios.post(`${stayApiURL}/add/${adminId}/stayProperty`, { StayProperty })
        console.log(response)
        return response.success;
    } catch (error) {
        console.error(error)
    }
}

export const getStayTestimonials = async () => {
    try {
        const response = await axios.get(`${stayApiURL}/all/stayProperty`);
        console.log(response)
        return { data: response.data.data, error: false };
        // return response.data.data;
    } catch (error) {
        console.error(error)
        return { error: true };
    }
}

export const deleteStayTestimonial = async (testimonialId) => {
    try {
        const res = await axios.delete(`${stayApiURL}/delete/${testimonialId}`)
        console.log(res.data)
        return res.data.success;
    } catch (error) {
        console.error(error)
    }
}