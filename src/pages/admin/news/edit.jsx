import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setNotif } from '../../../redux/notif/actions'
import { getData, putData, postData } from '../../../utils/fetch'
import Breadcrumbs from '../../../components/Breadcrumbs'
import AlertMessage from '../../../components/AlertMessage'
import NewsForm from './form'

const NewsEdit = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()

  const [form, setForm] = useState({
    title: '',
    content: '',
    author: '',
    image: '',
  })

  const [alert, setAlert] = useState({
    status: false,
    variant: '',
    message: '',
  })

  const [isLoading, setIsLoading] = useState(false)

  const fetchOneNews = async () => {
    const res = await getData(`/news/${id}`)

    setForm({
      title: res.data.data.title,
      content: res.data.data.content,
      author: res.data.data.author,
      image: res.data.data.image.name,
    })
  }

  useEffect(() => {
    fetchOneNews()
  }, [id])

  const handleImageUpload = async (file) => {
    let formData = new FormData()
    formData.append('image', file)
    const res = await postData('/images', formData, true)
    return res
  }

  const handleChange = async (e) => {
    if (e.target?.name === 'content') {
      setForm((prevForm) => ({
        ...prevForm,
        content: e.target.value,
      }))
    } else if (e.target.name === 'image') {
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
      title: form.title,
      content: form.content,
      author: form.author,
      image: form.file,
    }

    try {
      const res = await putData(`/news/${id}`, payload)
      if (res.data.data) {
        dispatch(setNotif(true, 'success', 'Data berhasil diedit'))
        navigate('/admin/news')
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
        dashboardUrl="/admin/dashboard"
        secondLevelText="Berita"
        secondLevelUrl="/admin/news"
        thirdLevelText="Edit Berita"
      />
      {alert.status && (
        <AlertMessage type={alert.type} message={alert.message} />
      )}
      <NewsForm
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        edit
      />
    </>
  )
}

export default NewsEdit
