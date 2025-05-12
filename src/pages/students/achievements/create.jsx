import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setNotif } from '../../../redux/notif/actions'
import { postData } from '../../../utils/fetch'
import { useSelector } from 'react-redux'
import Breadcrumbs from '../../../components/Breadcrumbs'
import AlertMessage from '../../../components/AlertMessage'
import AchievementForm from './form'

const AchievementsCreate = () => {
  const id = useSelector((state) => state.auth?.id)
  const notif = useSelector((state) => state.notif)
  const navigate = useNavigate()
  const dispatch = useDispatch()
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
    type: '',
    message: '',
  })

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const studentId = id
    if (studentId) {
      setForm((prev) => ({ ...prev, student: studentId }))
    }
  }, [])

  const handleImageUpload = async (file) => {
    let formData = new FormData()
    formData.append('image', file)
    const res = await postData('/images', formData, true)
    return res
  }
  
  const handleChange = async (e) => {
    if (e.target.name === 'image') {
      const file = e?.target?.files[0]
      if (
        e?.target?.files[0]?.type === 'image/jpg' ||
          e?.target?.files[0]?.type === 'image/png' ||
          e?.target?.files[0]?.type === 'image/jpeg'
      ) {
        const maxSize = 3 * 1024 * 1024
        if (file.size > maxSize) {
          setAlert({
            ...alert,
            status: true,
            type: 'danger',
            message: 'Ukuran gambar maksimal 3 MB',
          })
          setForm({
            ...form,
            file: '',
            [e.target.name]: '',
          })
        } else {
          const res = await handleImageUpload(e.target.files[0])
          setForm({
            ...form,
            file: res.data.data._id,
            [e.target.name]: res.data.data.name,
          })
        }
      } else {
        setAlert({
          ...alert,
          status: true,
          type: 'danger',
          message: 'Format gambar harus jpg, png, atau jpeg.',
        })
        setForm({
          ...form,
          file: '',
          [e.target.name]: '',
        })
      }
    } else {
      setForm({ ...form, [e.target.name]: e.target.value })
    }
  }
  
  const handleSubmit = async () => {
    setIsLoading(true)
  
    const payload = {
      name: form.name,
      date: form.date,
      activity_group: form.activity_group,
      activity_type: form.activity_type,
      achievement_type: form.achievement_type,
      competition_level: form.competition_level,
      student: form.student,
      image: form.file,
    }
  
    try {
      const res = await postData('/achievements', payload)
      if (res.data.data) {
        dispatch(setNotif(true, 'success', 'Data berhasil ditambahkan'))
        navigate('/student/achievements')
      }
    } catch (error) {
      setIsLoading(false)
      setAlert({
        ...alert,
        status: true,
        type: 'danger',
        message: error.response?.data?.msg,
      })
    }
  }

  return (
    <>
      <Breadcrumbs
        dashboardUrl='/student/dashboard'
        secondLevelText='Prestasi'
        secondLevelUrl='/student/achievements'
        thirdLevelText='Tambah Prestasi'
      />
      {alert.status && (
        <AlertMessage type={alert.type} message={alert.message} />
      )}
      <AchievementForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        form={form}
        isLoading={isLoading}
      />
    </>
  )
}

export default AchievementsCreate
