import React, { useState, useEffect } from 'react'
import Breadcrumbs from '../../../components/Breadcrumb'
import AlertMessage from '../../../components/AlertMessage'
import NewsForm from './form'
import { useNavigate } from 'react-router-dom'
import { postData } from '../../../utils/fetch'

const NewsCreate = () => {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    title: '',
    content: '',
    author: '',
  })

  const [alert, setAlert] = useState({
    status: false,
    variant: '',
    message: '',
  })

  const [isLoading, setIsLoading] = useState(false)

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
    setIsLoading(true)

    try {
      await postData('/news', form)
      navigate('/admin/news')
    } catch (err) {
      console.error('Error submitting news:', err)
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
        textSecond='Berita'
        urlSecond='/admin/news'
        textThird='Tambah Berita'
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
        handleImageUpload={handleImageUpload}
      />
    </>
  )
}

export default NewsCreate
