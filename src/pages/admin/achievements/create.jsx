import React, { useState, useEffect } from 'react'
import Breadcrumbs from '../../../components/Breadcrumb'
import AlertMessage from '../../../components/AlertMessage'
import AchievementForm from './form'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { config } from '../../../config'

const AchievementsCreate = () => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    date: '',
    activity_group: '',
    activity_type: '',
    achievement_type: '',
    competition_level: '',
    status: '',
    student: '',
    image: '',
  })

  const [alert, setAlert] = useState({
    show: false,
    type: '',
    message: '',
  })

  const [isLoading, setIsLoading] = useState(false)
  const [students, setStudents] = useState([])

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${config.api_host_dev}/students`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        
        setStudents(response.data.data.map(student => ({
          value: student._id,
          label: `${student.firstName} ${student.lastName}`,
        })))
      } catch (error) {
        console.error('Error fetching students:', error)
      }
    }

    fetchStudents()
  }, [token])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleImageUpload = async (file) => {
    if (!file) {
      console.error('No file selected!')
      setAlert({
        show: true,
        type: 'danger',
        message: 'Pilih gambar terlebih dahulu!',
      })
      return
    }
  
    console.log('Uploading file:', file) // Debugging
  
    const formData = new FormData()
    formData.append('image', file)
  
    try {
      const response = await axios.post(`${config.api_host_dev}/images`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
  
      console.log('Upload response:', response.data) // Debugging
  
      if (response.data && response.data.data && response.data.data._id) {
        setForm((prevForm) => ({ ...prevForm, image: response.data.data._id }))
        console.log('Image uploaded:', response.data.data._id) // Debugging
      } else {
        console.error('Invalid response structure:', response.data)
        setAlert({
          show: true,
          type: 'danger',
          message: 'Invalid response from server',
        })
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      setAlert({
        show: true,
        type: 'danger',
        message: error?.response?.data?.msg || 'Failed to upload image',
      })
    }
  }
  

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      await axios.post(`${config.api_host_dev}/achievements`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      navigate('/admin/achievements')
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      setAlert({
        ...alert,
        status: true,
        variant: 'danger',
        message: error?.response?.data?.msg,
      })
    }
  }

  return (
    <>
      <Breadcrumbs
        textSecond='Prestasi'
        urlSecond='/admin/achievements'
        textThird='Tambah Prestasi'
      />
      {alert.status && <AlertMessage variant={alert.variant} message={alert.message} />}
      <AchievementForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        form={form}
        setForm={setForm}
        isLoading={isLoading}
        students={students}
        handleImageUpload={handleImageUpload}
      />
    </>
  )
}

export default AchievementsCreate
