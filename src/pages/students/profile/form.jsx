import React from 'react'
import { Form, Row, Col } from 'react-bootstrap'
import AppButton from '../../../components/Button'
import Dropdown from '../../../components/Dropdown'
import TextInputWithLabel from '../../../components/TextInputWithLabel'
import ImageUpload from '../../../components/ImageUpload'

const study_program = [
  'Pendidikan Biologi',
  'Pendidikan Fisika',
  'Pendidikan Matematika',
  'Pendidikan Teknologi Informasi',
  'Sistem Informasi',
  'Pendidikan Bahasa dan Sastra Indonesia',
  'Pendidikan Bahasa Inggris',
  'Pendidikan Guru Sekolah Dasar',
  'Pendidikan IPS',
  'Pendidikan Pancasila dan Kewarganegaraan',
]

const ProfileForm = ({
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
        <Row className="mb-3">
          <Col md={6}>
            <TextInputWithLabel
              placeholder={'Masukkan nama depan'}
              label={'Nama Depan'}
              name={'firstName'}
              value={form.firstName}
              type={'text'}
              onChange={handleChange}
            />
          </Col>
          <Col md={6}>
            <TextInputWithLabel
              placeholder={'Masukkan nama belakang'}
              label={'Nama Belakang'}
              name={'lastName'}
              value={form.lastName}
              type={'text'}
              onChange={handleChange}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <TextInputWithLabel
              placeholder={'Masukkan ID Mahasiswa'}
              label={'ID Mahasiswa'}
              name={'student_id'}
              value={form.student_id}
              type={'text'}
              onChange={handleChange}
            />
          </Col>
          <Col md={6}>
            <Dropdown
              label={'Program Studi'}
              name={'study_program'}
              value={form.study_program}
              onChange={handleChange}
              options={[
                { value: '', label: 'Pilih Program Studi' },
                ...study_program.map((item) => ({ value: item, label: item })),
              ]}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <TextInputWithLabel
              placeholder={'Masukkan email'}
              label={'Email'}
              name={'email'}
              value={form.email}
              type={'email'}
              onChange={handleChange}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <TextInputWithLabel
              placeholder={'Masukkan password'}
              label={'Password'}
              name={'password'}
              value={form.password}
              type={'password'}
              onChange={handleChange}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <ImageUpload
              label={'Foto'}
              name={'image'}
              onChange={handleImageUpload}
              uploadedFile={uploadedFile}
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <AppButton
              className="mt-3"
              action={handleSubmit}
              isLoading={isLoading}
              disabled={isLoading}
            >
              {edit ? 'Edit' : 'Tambah'}
            </AppButton>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default ProfileForm
