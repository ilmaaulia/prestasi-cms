import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setNotif } from '../../../redux/notif/actions'
import { postData } from '../../../utils/fetch'
import Breadcrumbs from '../../../components/Breadcrumbs'
import AlertMessage from '../../../components/AlertMessage'
import NewsForm from './form'

const NewsCreate = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

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
      title: form.title,
      content: form.content,
      author: form.author,
      image: form.file,
    }

    try {
      const res = await postData('/news', payload)
      if (res.data.data) {
        dispatch(setNotif(true, 'success', 'Data berhasil ditambahkan'))
        navigate('/admin/news')
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
        secondLevelText="Berita"
        secondLevelUrl="/admin/news"
        thirdLevelText="Tambah Berita"
      />
      {alert.status && (
        <AlertMessage variant={alert.variant} message={alert.message} />
      )}
      <NewsForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        form={form}
        setForm={setForm}
        isLoading={isLoading}
      />
    </>
  )
}

export default NewsCreate
