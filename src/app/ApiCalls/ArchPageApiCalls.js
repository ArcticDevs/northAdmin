import axios from "axios";
import { url } from './ApiUrl'
import Swal from 'sweetalert2'

const researchApiUrl = `${url}/data/research`
const projectApiUrl = `${url}/data/project`

export const postResearchData = async (research) => {
    const adminId = JSON.parse(localStorage.getItem("userDetails"))._id;
    console.log(adminId)
    try {
        const response = await axios.post(`${researchApiUrl}/add/${adminId}`, { research })
        console.log(response)
        if (response.status === 201) {
            Swal.fire({
                title: 'Data Uploaded Successfully!',
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

export const getResearchData = async () => {
    try {
        const response = await axios.get(`${researchApiUrl}/all`)
        console.log(response)
        return response.data.data;
    }
    catch (error) {
        console.error(error)
    }
}

export const deleteResearchData = async (id) => {
    try {
        const response = await axios.delete(`${researchApiUrl}/delete/${id}`)
        console.log(response)
        return response.data.success;
    }
    catch (error) {
        console.error(error)
    }
}

export const postProjectData = async (project) => {
    const adminId = JSON.parse(localStorage.getItem("userDetails"))._id;
    console.log(adminId)
    // const body = { images }
    // console.log(body)
    try {
        const response = await axios.post(`${projectApiUrl}/add/${adminId}`, { project })
        console.log(response)
        if (response.status === 201) {
            Swal.fire({
                title: 'Data Uploaded Successfully!',
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

export const getProjectData = async () => {
    try {
        const response = await axios.get(`${projectApiUrl}/all`)
        console.log(response)
        return response.data.data;
    }
    catch (error) {
        console.error(error)
    }
}

export const deleteProjectData = async (id) => {
    try {
        const response = await axios.delete(`${projectApiUrl}/delete/${id}`)
        console.log(response)
        return response.data.success;
    }
    catch (error) {
        console.error(error)
    }
}