import axios from "axios";
import { url } from './ApiUrl'
import Swal from 'sweetalert2'

const slideApiURL = `${url}/data/aboutpage/abovevision`

export const postImages = async (images) => {
    console.log(images)
    const adminId = JSON.parse(localStorage.getItem("userDetails"))._id;
    console.log(adminId)
    try {
        const response = await axios.post(`${slideApiURL}/add/${adminId}`, {images})
        console.log(response)
        if (response.status === 201) {
            Swal.fire({
                title: 'Files Uploaded Successfully!',
                icon: 'success',
                confirmButtonText: 'Close',
            })
        } else {
            Swal.fire({
                title: 'Error Occured , please try again',
                icon: 'error',
                confirmButtonText: 'Close',
            })
            return response.data.data;
        }
    }
    catch (error) {
        console.error(error)
    }

}

export const getImages = async () => {
    try {
        const response = await axios.get(`${slideApiURL}/all`)
        console.log(response)
        return response.data.data;
    }
    catch (error) {
        console.error(error)
    }
}

export const deleteImages = async (id) => {
    try {
        const response = await axios.delete(`${slideApiURL}/delete/${id}`)
        console.log(response)
        return response.data.data;
    }
    catch (error) {
        console.error(error)
    }
}