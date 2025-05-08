import React from 'react'
import { Form, Figure } from 'react-bootstrap'
import { config } from '../../../config'
import AppButton from '../../../components/Button'
import TextInputWithLabel from '../../../components/TextInputWithLabel'
import RichTextEditor from '../../../components/RichTextEditor'

const NewsForm = ({ handleSubmit, form, handleChange, isLoading, edit }) => {
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

        <RichTextEditor
          label="Konten Berita"
          name="content"
          value={form.content}
          onChange={handleChange}
        />

        <TextInputWithLabel
          placeholder={'Masukkan nama penulis'}
          label={'Penulis'}
          name={'author'}
          value={form.author}
          type={'text'}
          onChange={handleChange}
        />

        <TextInputWithLabel
          placeholder={'Masukan Gambar Pendukung'}
          label={'Gambar Pendukung'}
          name="image"
          type="file"
          onChange={handleChange}
        />
        {form.image !== '' && (
          <div>
            <Figure>
              <Figure.Image
                width={150}
                alt="Pratinjau gambar pendukung"
                src={`${config.image_base_url}/${form.image}`}
              />
            </Figure>
          </div>
        )}

        <AppButton className="mt-3" action={handleSubmit} loading={isLoading}>
          {edit ? 'Edit' : 'Tambah'}
        </AppButton>
      </Form>
    </>
  )
}

export default NewsForm
