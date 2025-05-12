import React from 'react'
import { Form, Row, Col, Figure } from 'react-bootstrap'
import { config } from '../../../config'
import AppButton from '../../../components/Button'
import Dropdown from '../../../components/Dropdown'
import TextInputWithLabel from '../../../components/TextInputWithLabel'

const activity_group = ['Akademik', 'Non-akademik']
const activity_type = ['Aktivitas Kemahasiswaan', 'Kompetisi', 'PKM']
const achievement_type = ['Science', 'Seni', 'Olahraga', 'Lainnya']
const competition_level = ['Internasional', 'Nasional', 'Regional', 'Lainnya']

const AchievementsForm = ({
  handleSubmit,
  form,
  handleChange,
  isLoading,
  edit,
}) => {
  return (
    <>
      <Form>
        <Row className="mb-3">
          <Col md={6}>
            <TextInputWithLabel
              placeholder={'Masukkan nama prestasi'}
              label={'Nama Prestasi'}
              name={'name'}
              value={form.name}
              type={'text'}
              onChange={handleChange}
            />
          </Col>
          <Col md={6}>
            <TextInputWithLabel
              placeholder={'Masukkan tanggal'}
              label={'Tanggal'}
              name={'date'}
              value={form.date}
              type={'date'}
              onChange={handleChange}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Dropdown
              label={'Kelompok Aktivitas'}
              name={'activity_group'}
              value={form.activity_group}
              onChange={handleChange}
              options={[
                { value: '', label: 'Pilih Kelompok Aktivitas' },
                ...activity_group.map((item) => ({ value: item, label: item })),
              ]}
            />
          </Col>
          <Col md={6}>
            <Dropdown
              label={'Jenis Aktivitas'}
              name={'activity_type'}
              value={form.activity_type}
              onChange={handleChange}
              options={[
                { value: '', label: 'Pilih Jenis Aktivitas' },
                ...activity_type.map((item) => ({ value: item, label: item })),
              ]}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Dropdown
              label={'Jenis Prestasi'}
              name={'achievement_type'}
              value={form.achievement_type}
              onChange={handleChange}
              options={[
                { value: '', label: 'Pilih Jenis Prestasi' },
                ...achievement_type.map((item) => ({ value: item, label: item })),
              ]}
            />
          </Col>
          <Col md={6}>
            <Dropdown
              label={'Tingkat Kompetisi'}
              name={'competition_level'}
              value={form.competition_level}
              onChange={handleChange}
              options={[
                { value: '', label: 'Pilih Tingkat Kompetisi' },
                ...competition_level.map((item) => ({ value: item, label: item })),
              ]}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <TextInputWithLabel
            placeholder={'Masukan Bukti Prestasi'}
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
                  alt="Pratinjau gambar bukti prestasi"
                  src={`${config.image_base_url}/${form.image}`}
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

export default AchievementsForm
