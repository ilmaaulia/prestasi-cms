import React, { useState, useEffect } from 'react'
import Breadcrumbs from '../../../components/Breadcrumbs'
import AlertMessage from '../../../components/AlertMessage'
import NewsForm from './form'
import { useNavigate, useParams } from 'react-router-dom'
import { getData, putData, postData } from '../../../utils/fetch'
import { config } from '../../../config'

const NewsEdit = () => {
  const navigate = useNavigate()
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
  const [uploadedFile, setUploadedFile] = useState(null)
  const [initialImage, setInitialImage] = useState(null)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await getData(`/news/${id}`)
        const data = res.data.data
        
        setForm({
          title: data.title || '',
          content: data.content || '',
          author: data.author || '',
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
          message: 'Gagal memuat data berita',
        })
      }
    }

    fetchNews()
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

      await putData(`/news/${id}`, updatedForm)
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
        dashboardUrl='/admin/dashboard'
        secondLevelText='Berita'
        secondLevelUrl='/admin/news'
        thirdLevelText='Edit Berita'
      />
      {alert.status && (
        <AlertMessage variant={alert.variant} message={alert.message} />
      )}
      <NewsForm
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

export default NewsEdit
