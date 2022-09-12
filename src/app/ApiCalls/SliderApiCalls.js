import axios from "axios";
import { url } from './ApiUrl'
import Swal from 'sweetalert2'

const slideApiURL = `${url}/data/sliderImages`

export const postImages = async (images) => {
    console.log(images)
    const adminId = JSON.parse(localStorage.getItem("userDetails"))._id;
    console.log(adminId)
    try {
        const response = await axios.post(`${slideApiURL}/add/${adminId}`, { images })
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
        }
    }
    catch (error) {
        console.error(error)
    }

}

export const getImages = async (sectionValue) => {
    try {
        const response = await axios.get(`${slideApiURL}/get/${sectionValue}`)
        console.log(response)
        if(response.data.data.length<1)
            return { error: true };
        else {
            return { error: false, data: response.data.data };
        }
    }
    catch (error) {
        console.error(error)
        return { error: true };
    }
}

export const deleteImages = async (id) => {
    try {
        const response = await axios.delete(`${slideApiURL}/delete/${id}`)
        console.log(response)
        return response.data.success;
    }
    catch (error) {
        console.error(error)
    }
}