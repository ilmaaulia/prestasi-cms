import React, { useState, useEffect } from 'react'
import Breadcrumbs from '../../../components/Breadcrumb'
import AlertMessage from '../../../components/AlertMessage'
import AchievementForm from './form'
import { useNavigate } from 'react-router-dom'
import { postData } from '../../../utils/fetch'
import { useSelector } from 'react-redux'

const AchievementsCreate = () => {
  const id = useSelector((state) => state.auth?.id)
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    date: '',
    activity_group: '',
    activity_type: '',
    achievement_type: '',
    competition_level: '',
    student: '',
    image: '',
  })

  const [alert, setAlert] = useState({
    status: false,
    variant: '',
    message: '',
  })

  const [isLoading, setIsLoading] = useState(false)
  const [students, setStudents] = useState([])

  useEffect(() => {
    const studentId = id
    if (studentId) {
      setForm((prev) => ({ ...prev, student: studentId }))
    }
  }, [])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleImageUpload = async (file) => {
    if (!file) return

    const formData = new FormData()
    formData.append('image', file)

    try {
      const res = await postData('/images', formData, true)
      if (res?.data?.data?._id) {
        setForm((prev) => ({ ...prev, image: res.data.data._id }))
      } else {
        throw new Error('Invalid image response')
      }
    } catch (err) {
      console.error('Error uploading image:', err)
      setAlert({
        status: true,
        variant: 'danger',
        message: err?.response?.data?.msg,
      })
    }
  }

  const handleSubmit = async () => {
    if (!form.image) {
      setAlert({
        status: true,
        variant: 'danger',
        message: 'Bukti Prestasi harus diupload!',
      })
      return
    }

    setIsLoading(true)

    try {
      await postData('/achievements', form)
      navigate('/student/achievements')
    } catch (err) {
      console.error('Error submitting achievement:', err)
      setAlert({
        status: true,
        variant: 'danger',
        message: err?.response?.data?.msg,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Breadcrumbs
        textSecond='Prestasi'
        urlSecond='/student/achievements'
        textThird='Tambah Prestasi'
      />
      {alert.status && (
        <AlertMessage variant={alert.variant} message={alert.message} />
      )}
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
