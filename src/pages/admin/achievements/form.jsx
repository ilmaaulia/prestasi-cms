import React from 'react'
import { Form } from 'react-bootstrap'
import AppButton from '../../../components/Button'
import Dropdown from '../../../components/Dropdown'
import TextInputWithLabel from '../../../components/TextInputWithLabel'
import ImageUpload from '../../../components/ImageUpload'

const activity_group = ['Akademik', 'Non-akademik']
const activity_type = ['Aktivitas Kemahasiswaan', 'Kompetisi', 'PKM']
const achievement_type = ['Science', 'Seni', 'Olahraga', 'Lainnya']
const competition_level = ['Internasional', 'Nasional', 'Regional', 'Lainnya']
const status = ['Belum Divalidasi', 'Valid', 'Tidak Valid']

const AchievementsForm = ({
  handleSubmit,
  form,
  handleChange,
  handleImageUpload,
  uploadedFile,
  isLoading,
  edit,
  students,
}) => {
  return (
    <Form>
      <TextInputWithLabel
        placeholder={'Masukkan nama prestasi'}
        label={'Nama Prestasi'}
        name={'name'}
        value={form.name}
        type={'text'}
        onChange={handleChange}
      />

      <TextInputWithLabel
        placeholder={'Masukkan tanggal'}
        label={'Tanggal'}
        name={'date'}
        value={form.date}
        type={'date'}
        onChange={handleChange}
      />

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

      <Dropdown
        label={'Mahasiswa'}
        name={'student'}
        value={form.student}
        onChange={handleChange}
        options={[
          { value: '', label: 'Pilih Mahasiswa' },
          ...students,
        ]}
      />

      <ImageUpload
        label={'Bukti Prestasi'}
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
  )
}

export default AchievementsForm
