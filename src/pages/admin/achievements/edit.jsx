import React, { useState, useEffect } from 'react'
import Breadcrumbs from '../../../components/Breadcrumb'
import AlertMessage from '../../../components/AlertMessage'
import AchievementForm from './form'
import { useNavigate, useParams } from 'react-router-dom'
import { getData, postData, putData } from '../../../utils/fetch'
import { config } from '../../../config'

const AchievementsEdit = () => {
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
    status: false,
    variant: '',
    message: '',
  })

  const [isLoading, setIsLoading] = useState(false)
  const [students, setStudents] = useState([])
  const [uploadedFile, setUploadedFile] = useState(null)
  const [initialImage, setInitialImage] = useState(null)

  useEffect(() => {
    const fetchAchievement = async () => {
      try {
        const res = await getData(`/achievements/${id}`)
        const data = res.data.data

        setForm({
          name: data.name || '',
          date: data.date ? data.date.substring(0, 10) : '',
          activity_group: data.activity_group || '',
          activity_type: data.activity_type || '',
          achievement_type: data.achievement_type || '',
          competition_level: data.competition_level || '',
          status: data.status || '',
          student: data.student?._id || '',
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
          message: 'Gagal memuat data prestasi',
        })
      }
    }

    fetchAchievement()
  }, [id])

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await getData('/students')
        setStudents(res.data.data.map((student) => ({
          value: student._id,
          label: `${student.firstName} ${student.lastName}`,
        })))
      } catch (err) {
        console.error('Error fetching students:', err)
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const updatedForm = {
        ...form,
        image: uploadedFile ? uploadedFile._id : initialImage?._id,
      }

      await putData(`/achievements/${id}`, updatedForm)
      navigate('/admin/achievements')
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
        textSecond='Prestasi'
        urlSecond='/admin/achievements'
        textThird='Edit Prestasi'
      />
      {alert.status && (
        <AlertMessage variant={alert.variant} message={alert.message} />
      )}
      <AchievementForm
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleImageUpload={handleImageUpload}
        students={students}
        isLoading={isLoading}
        alert={alert}
        setAlert={setAlert}
        edit={true}
        uploadedFile={uploadedFile}
      />
    </>
  )
}

export default AchievementsEdit
