import axios from "axios";
import { url } from './ApiUrl'
import Swal from 'sweetalert2'

const teamsApiUrl = `${url}/data/aboutpage/teamsdata`

export const postTeamsData = async (teamsData) => {
    const adminId = JSON.parse(localStorage.getItem("userDetails"))._id;
    console.log(adminId)
    // const body = { images }
    // console.log(body)
    try {
        const response = await axios.post(`${teamsApiUrl}/add/${adminId}`, { teamsData })
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

export const getTeamsData = async () => {
    try {
        const response = await axios.get(`${teamsApiUrl}/all`)
        console.log(response)
        return { data: response.data.data, error: false };
    }
    catch (error) {
        console.error(error)
        return { error: true }
    }
}

export const deleteTeamData = async (id) => {
    try {
        const response = await axios.delete(`${teamsApiUrl}/delete/${id}`)
        console.log(response)
        return response.data.success;
    }
    catch (error) {
        console.error(error)
    }
}