import axios from 'axios'

const apiURL = 'http://localhost:4001'

export const registerUser = async (email, username, password) => {
  try {
    return axios.post(`${apiURL}/api/user/register`, {
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
    return axios.post(`${apiURL}/api/user/login`, {
      email,
      password,
    })
  } catch (error) {
    console.error(error)
  }
}
