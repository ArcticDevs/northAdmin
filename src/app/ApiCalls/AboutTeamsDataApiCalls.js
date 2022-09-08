import axios from "axios";
import { url } from './ApiUrl'
import Swal from 'sweetalert2'

const teamsApiUrl = `${url}/data/aboutpage/teamsdata`

export const postTeamsData = async (formData) => {
    const adminId = JSON.parse(localStorage.getItem("userDetails"))._id;
    console.log(adminId)
    // const body = { images }
    // console.log(body)
    try {
        const response = await axios.post(`${teamsApiUrl}/add/${adminId}`, )
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

export const getTeamsData = async (sectionValue) => {
    try {
        const response = await axios.get(`${teamsApiUrl}/get/${sectionValue}`)
        console.log(response)
        return response.data.data;
    }
    catch (error) {
        console.error(error)
    }
}

export const deleteTeamData = async (id) => {
    try {
        const response = await axios.delete(`${teamsApiUrl}/delete/${id}`)
        console.log(response)
        return response.data.data;
    }
    catch (error) {
        console.error(error)
    }
}