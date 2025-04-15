import React from 'react'
import { Form } from 'react-bootstrap'
import AppButton from '../../../components/Button'
import TextInputWithLabel from '../../../components/TextInputWithLabel'
import TextAreaWithLabel from '../../../components/TextAreaWithLabel'
import ImageUpload from '../../../components/ImageUpload'

const NewsForm = ({
  handleSubmit,
  form,
  handleChange,
  handleImageUpload,
  uploadedFile,
  isLoading,
  edit,
}) => {
  return (
    <>
      <Form>
        <TextInputWithLabel
          placeholder={'Masukkan judul berita'}
          label={'Judul Berita'}
          name={'title'}
          value={form.title}
          type={'text'}
          onChange={handleChange}
        />

        <TextAreaWithLabel
          placeholder={'Masukkan konten berita'}
          label={'Konten Berita'}
          name={'content'}
          value={form.content}
          onChange={handleChange}
          rows={8}
        />

        <TextInputWithLabel
          placeholder={'Masukkan nama penulis'}
          label={'Penulis'}
          name={'author'}
          value={form.author}
          type={'text'}
          onChange={handleChange}
        />

        <ImageUpload
          label={'Gambar Berita'}
          name={'image'}
          onChange={handleImageUpload}
          uploadedFile={uploadedFile}
        />

        <AppButton
          className="mt-3"
          action={handleSubmit}
          isLoading={isLoading}
          disabled={isLoading}
        >
          {edit ? 'Edit' : 'Tambah'}
        </AppButton>
      </Form>
    </>
  )
}

export default NewsForm
