import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setNotif } from '../../../redux/notif/actions'
import { fetchStudents } from '../../../redux/students/actions'
import { getData, postData, putData } from '../../../utils/fetch'
import Breadcrumbs from '../../../components/Breadcrumbs'
import AlertMessage from '../../../components/AlertMessage'
import AchievementForm from './form'

const AchievementsEdit = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()

  const [form, setForm] = useState({
    name: '',
    date: '',
    activity_group: '',
    activity_type: '',
    achievement_type: '',
    competition_level: '',
    status: '',
    image: '',
  })

  const [alert, setAlert] = useState({
    status: false,
    variant: '',
    message: '',
  })

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    dispatch(fetchStudents())
  }, [])

  const students = useSelector((state) =>
    (state.students.data || []).map((student) => ({
      value: student._id,
      label: `${student.firstName} ${student.lastName}`,
    })),
  )

  const fetchOneAchievement = async () => {
    const res = await getData(`/achievements/${id}`)

    setForm({
      name: res.data.data.name,
      date: res.data.data.date ? res.data.data.date.substring(0, 10) : '',
      activity_group: res.data.data.activity_group,
      activity_type: res.data.data.activity_type,
      achievement_type: res.data.data.achievement_type,
      competition_level: res.data.data.competition_level,
      status: res.data.data.status,
      student: res.data.data.student?._id,
      image: res.data.data.image.name,
    })
  }

  useEffect(() => {
    fetchOneAchievement()
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
            variant: 'danger',
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
          variant: 'danger',
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
      status: form.status,
      student: form.student,
      image: form.file,
    }

    try {
      const res = await putData(`/achievements/${id}`, payload)
      if (res.data.data) {
        dispatch(setNotif(true, 'success', 'Data berhasil diedit'))
        navigate('/admin/achievements')
      }
    } catch (error) {
      setIsLoading(false)
      setAlert({
        ...alert,
        status: true,
        variant: 'danger',
        message: error.response?.data?.msg,
      })
    }
  }

  return (
    <>
      <Breadcrumbs
        dashboardUrl="/admin/dashboard"
        secondLevelText="Prestasi"
        secondLevelUrl="/admin/achievements"
        thirdLevelText="Edit Prestasi"
      />
      {alert.status && (
        <AlertMessage variant={alert.variant} message={alert.message} />
      )}
      <AchievementForm
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        students={students}
        isLoading={isLoading}
        edit
      />
    </>
  )
}

export default AchievementsEdit
