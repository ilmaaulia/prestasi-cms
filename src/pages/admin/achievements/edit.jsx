import React, { useState, useEffect } from 'react'
import Breadcrumbs from '../../../components/Breadcrumb'
import AlertMessage from '../../../components/AlertMessage'
import AchievementForm from './form'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { config } from '../../../config'

const AchievementsEdit = () => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const { id } = useParams()

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
  const [uploadedFile, setUploadedFile] = useState(null)
  const [initialImage, setInitialImage] = useState(null)

  useEffect(() => {
    const fetchAchievement = async () => {
      try {
        const response = await axios.get(`${config.api_host_dev}/achievements/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const data = response.data.data

        setForm({
          name: data.name || '',
          date: data.date ? data.date.substring(0, 10) : '',
          activity_group: data.activity_group || '',
          activity_type: data.activity_type || '',
          achievement_type: data.achievement_type || '',
          competition_level: data.competition_level || '',
          status: data.status || '',
          student: data.student ? data.student._id : '',
          image: data.image ? data.image.name : '',
        })

        setUploadedFile({
          ...data.image,
          url: `${config.api_host_dev}/images/${data.image._id}`,
        })
        setInitialImage(data.image)
      } catch (error) {
        setAlert({
          show: true,
          type: 'danger',
          message: 'Gagal memuat data prestasi',
        })
      }
    }

    fetchAchievement()
  }, [id, token])

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${config.api_host_dev}/students`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setStudents(
          response.data.data.map((student) => ({
            value: student._id,
            label: `${student.firstName} ${student.lastName}`,
          })),
        )
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

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const updatedForm = {
        ...form,
        image: uploadedFile ? uploadedFile._id : initialImage._id,
      }

      const response = await axios.put(
        `${config.api_host_dev}/achievements/${id}`,
        updatedForm,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      navigate('/admin/achievements')
    } catch (error) {
      setAlert({
        show: true,
        type: 'danger',
        message: error.response?.data?.message || 'Gagal mengupdate data',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageUpload = async (file) => {
    if (!file) {
      setAlert({
        show: true,
        type: 'danger',
        message: 'Pilih gambar terlebih dahulu!',
      })
      return
    }

    const formData = new FormData()
    formData.append('image', file)

    try {
      const response = await axios.post(`${config.api_host_dev}/images`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })

      setForm((prevForm) => ({ ...prevForm, image: response.data.data._id }))
      setUploadedFile({
        ...response.data.data,
        url: URL.createObjectURL(file),
      })
    } catch (error) {
      setAlert({
        show: true,
        type: 'danger',
        message: 'Invalid response from server',
      })
    }
  }

  return (
    <>
      <Breadcrumbs
        textSecond='Prestasi'
        urlSecond='/admin/achievements'
        textThird='Edit Prestasi'
      />
      {alert.show && <AlertMessage variant={alert.type} message={alert.message} />}
      <AchievementForm
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleImageUpload={handleImageUpload}
        students={students}
        alert={alert}
        setAlert={setAlert}
        isLoading={isLoading}
        edit={true}
        uploadedFile={uploadedFile}
      />
    </>
  )
}

export default AchievementsEdit
