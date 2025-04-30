import React, { useState, useEffect } from 'react'
import Breadcrumbs from '../../../components/Breadcrumbs'
import AlertMessage from '../../../components/AlertMessage'
import AchievementForm from './form'
import { useNavigate } from 'react-router-dom'
import { getData, postData } from '../../../utils/fetch'

const AchievementsCreate = () => {
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
    status: false,
    variant: '',
    message: '',
  })

  const [isLoading, setIsLoading] = useState(false)
  const [students, setStudents] = useState([])

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await getData('/students', {})

        setStudents(res.data.data.map((student) => ({
          value: student._id,
          label: `${student.firstName} ${student.lastName}`,
        })))
      } catch (err) {
        console.error('Error fetching students data:', err)
      }
    }

    fetchStudents()
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
      navigate('/admin/achievements')
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
        dashboardUrl='/admin/dashboard'
        secondLevelText='Prestasi'
        secondLevelUrl='/admin/achievements'
        thirdLevelText='Tambah Prestasi'
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
