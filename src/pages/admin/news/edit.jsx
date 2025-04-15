import React, { useState, useEffect } from 'react'
import Breadcrumbs from '../../../components/Breadcrumb'
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
      console.log('Fetching news data for ID:', id)
      try {
        const res = await getData(`/news/${id}`)
        const data = res.data.data
        console.log('Fetched news data:', data)
        
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
        console.error('Error fetching news data:', err)
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
    console.log('Form change detected:', e.target.name, e.target.value)
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Submitting form with data:', form)
    setIsLoading(true)

    try {
      const updatedForm = {
        ...form,
        image: uploadedFile ? uploadedFile._id : initialImage?._id,
      }
      console.log('Updated form data:', updatedForm)

      await putData(`/news/${id}`, updatedForm)
      console.log('Form submitted successfully')
    } catch (err) {
      console.error('Error submitting form:', err)
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
    console.log('Uploading image file:', file)
  
    const formData = new FormData()
    formData.append('image', file)
  
    try {
      const res = await postData('/images', formData, true)
      console.log('Image upload response:', res)
      if (res?.data?.data?._id) {
        setForm((prevForm) => ({ ...prevForm, image: res.data.data._id }))
        setUploadedFile({
          ...res.data.data,
          url: URL.createObjectURL(file),
        })
        console.log('Image uploaded successfully:', res.data.data)
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

  return (
    <>
      <Breadcrumbs
        textSecond='News'
        urlSecond='/admin/news'
        textThird='Edit Berita'
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
