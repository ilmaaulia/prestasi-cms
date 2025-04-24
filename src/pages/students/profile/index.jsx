import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Breadcrumbs from '../../../components/Breadcrumb'
import AlertMessage from '../../../components/AlertMessage'
import UserForm from './form'
import { useNavigate } from 'react-router-dom'
import { getData, postData, putData } from '../../../utils/fetch'
import { config } from '../../../config'

const ProfilePage = () => {
  const navigate = useNavigate()

  const id = useSelector((state) => state.auth?.id)

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    student_id: '',
    email: '',
    study_program: '',
    status: '',
    image: '',
  })

  const [alert, setAlert] = useState({
    status: false,
    variant: '',
    message: '',
  })

  const [isLoading, setIsLoading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState(null)
  const [initialImage, setInitialImage] = useState(null)

  useEffect(() => {
    if (id) {
      navigate(`/student/profile/${id}`)
    }
  }, [id, navigate])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getData(`/students/${id}`)
        const data = res.data.data

        setForm({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          email: data.email || '',
          student_id: data.student_id || '',
          study_program: data.study_program || '',
          status: data.status || '',
          image: data.image?._id || '',
        })

        setUploadedFile({
          ...data.image,
          url: `${config.image_base_url}/images/${data.image._id}`,
        })
        setInitialImage(data.image)
      } catch (err) {
        setAlert({
          status: true,
          variant: 'danger',
          message: 'Gagal memuat data pengguna',
        })
      }
    }

    fetchUsers()
  }, [id])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const updatedForm = {
        ...form,
        image: uploadedFile ? uploadedFile._id : initialImage?._id,
      }

      await putData(`/students/${id}`, updatedForm)
      navigate('/student/profile/${id}')
      setAlert({
        status: true,
        variant: 'success',
        message: 'Data pengguna berhasil diperbarui',
      })
    } catch (err) {
      setAlert({
        status: true,
        variant: 'danger',
        message: err?.response?.data?.msg,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageUpload = async (file) => {
    if (!file) return

    const formData = new FormData()
    formData.append('image', file)

    try {
      const res = await postData('/images', formData, true)
      if (res?.data?.data?._id) {
        setForm((prevForm) => ({ ...prevForm, image: res.data.data._id }))
        setUploadedFile({
          ...res.data.data,
          url: URL.createObjectURL(file),
        })
      } else {
        throw new Error('Invalid image response')
      }
    } catch (err) {
      setAlert({
        status: true,
        variant: 'danger',
        message: err?.response?.data?.msg,
      })
    }
  }

  return (
    <>
      <Breadcrumbs
        textSecond='Users'
        urlSecond='/student/users'
        textThird='Edit Pengguna'
      />
      {alert.status && (
        <AlertMessage variant={alert.variant} message={alert.message} />
      )}
      <UserForm
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleImageUpload={handleImageUpload}
        isLoading={isLoading}
        alert={alert}
        setAlert={setAlert}
        edit={true}
        uploadedFile={uploadedFile}
      />
    </>
  )
}

export default ProfilePage
