import axios from 'axios'
import {url} from './ApiUrl'

export const registerUser = async (email, username, password) => {
  try {
    return axios.post(`${url}/user/register`, {
      email,
      username,
      password,
    })
  } catch (error) {
    console.error(error)
  }
}

export const loginUser = async (email,password) => {
  try {
    return axios.post(`${url}/user/login`, {
      email,
      password,
    })
  } catch (error) {
    console.error(error)
  }
}
