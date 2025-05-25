import axios from 'axios'
import handleError from './handle-error'
import { config } from '../config'

export async function getData(url, params) {
  try {
    const { token } = localStorage.getItem('auth')
      ? JSON.parse(localStorage.getItem('auth'))
      : {}

    return await axios.get(`${config.api_host_prod}${url}`, {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  } catch (err) {
    return await handleError(err)
  }
}

export async function postData(url, payload, formData) {
  try {
    const { token } = localStorage.getItem('auth')
      ? JSON.parse(localStorage.getItem('auth'))
      : {}

    const res = await axios.post(`${config.api_host_prod}${url}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': formData ? 'multipart/form-data' : 'application/json',
      },
    })
    return res
  } catch (err) {
    return await handleError(err)
  }
}

export async function putData(url, payload) {
  try {
    const { token } = localStorage.getItem('auth')
      ? JSON.parse(localStorage.getItem('auth'))
      : {}

    return await axios.put(`${config.api_host_prod}${url}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  } catch (err) {
    return await handleError(err)
  }
}

export async function deleteData(url) {
  try {
    const { token } = localStorage.getItem('auth')
      ? JSON.parse(localStorage.getItem('auth'))
      : {}

    return await axios.delete(`${config.api_host_prod}${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  } catch (err) {
    return await handleError(err)
  }
}
