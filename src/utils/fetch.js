import axios from 'axios'
import { config } from '../config'

const getData = async (url, params) => {
  const { token } = localStorage.getItem('auth')
    ? JSON.parse(localStorage.getItem('auth'))
    : {}

  return await axios.get(`${config.api_host_dev}${url}`, {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

const postData = async (url, payload, formData) => {
  const { token } = localStorage.getItem('auth')
    ? JSON.parse(localStorage.getItem('auth'))
    : {}

  return await axios.post(`${config.api_host_dev}${url}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': formData ? 'multipart/form-data' : 'application/json',
    },
  })
}

const putData = async (url, payload) => {
  const { token } = localStorage.getItem('auth')
    ? JSON.parse(localStorage.getItem('auth'))
    : {}

  return await axios.put(`${config.api_host_dev}${url}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

const deleteData = async (url) => {
  const { token } = localStorage.getItem('auth')
    ? JSON.parse(localStorage.getItem('auth'))
    : {}

  return await axios.delete(`${config.api_host_dev}${url}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export { 
  getData, 
  postData, 
  putData, 
  deleteData, 
}
