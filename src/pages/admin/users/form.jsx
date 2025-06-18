import React from 'react'
import { Form, Row, Col, Figure } from 'react-bootstrap'
import AppButton from '../../../components/Button'
import Dropdown from '../../../components/Dropdown'
import TextInputWithLabel from '../../../components/TextInputWithLabel'

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
const status = ['Aktif', 'Tidak Aktif']

const UserForm = ({ handleSubmit, form, handleChange, isLoading, edit }) => {
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
          <Col md={6}>
            <Dropdown
              label={'Status'}
              name={'status'}
              value={form.status}
              onChange={handleChange}
              options={[
                { value: '', label: 'Pilih Status' },
                ...status.map((item) => ({ value: item, label: item })),
              ]}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <TextInputWithLabel
            placeholder={'Masukkan foto profil'}
            label={'Bukti Prestasi'}
            name="image"
            type="file"
            onChange={handleChange}
          />
          {form.image !== '' && (
            <div>
              <Figure>
                <Figure.Image
                  width={150}
                  alt="Pratinjau foto profil"
                  src={form.image}
                />
              </Figure>
            </div>
          )}
        </Row>

        <Row>
          <Col>
            <AppButton action={handleSubmit} loading={isLoading}>
              {edit ? 'Edit' : 'Tambah'}
            </AppButton>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default UserForm
