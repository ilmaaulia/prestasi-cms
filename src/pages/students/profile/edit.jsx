import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setNotif } from '../../../redux/notif/actions'
import { getData, postData, putData } from '../../../utils/fetch'
import Breadcrumbs from '../../../components/Breadcrumbs'
import AlertMessage from '../../../components/AlertMessage'
import UserForm from './form'

const StudentProfileEdit = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
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

  const fetchOneStudent = async () => {
    const res = await getData(`/students/${id}`)

    setForm({
      firstName: res.data.data.firstName,
      lastName: res.data.data.lastName,
      student_id: res.data.data.student_id,
      email: res.data.data.email,
      study_program: res.data.data.study_program,
      status: res.data.data.status,
      image: res.data.data.image.name,
    })
  }

  useEffect(() => {
    fetchOneStudent()
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
      firstName: form.firstName,
      lastName: form.lastName,
      student_id: form.student_id,
      email: form.email,
      study_program: form.study_program,
      status: form.status,
      image: form.file,
    }

    try {
      const res = await putData(`/students/${id}`, payload)
      if (res.data.data) {
        dispatch(setNotif(true, 'success', 'Data berhasil diedit'))
        navigate(`/student/profile/${id}`)
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
        dashboardUrl='/student/dashboard'
        secondLevelText='Profil'
        secondLevelUrl={`/student/profile/${id}`}
        thirdLevelText='Edit Profil'
      />
      {alert.status && (
        <AlertMessage variant={alert.variant} message={alert.message} />
      )}
      <UserForm
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </>
  )
}

export default StudentProfileEdit
