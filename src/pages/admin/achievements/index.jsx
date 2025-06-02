import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { fetchAchievements, setKeyword, setPage } from '../../../redux/achievements/actions'
import { setNotif } from '../../../redux/notif/actions'
import { accessAchievementsForAdmin } from '../../../constants/access'
import { deleteData, putData } from '../../../utils/fetch'
import Breadcrumbs from '../../../components/Breadcrumbs'
import AppButton from '../../../components/Button'
import Table from '../../../components/TableWithAction'
import AlertMessage from '../../../components/AlertMessage'
import SearchInput from '../../../components/SearchInput'

const AchievementsPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const notif = useSelector((state) => state.notif)
  const achievements = useSelector((state) => state.achievements)
  const [access, setAccess] = useState({
    create: false,
    update: false,
    delete: false,
  })

  const checkAccess = () => {
    let { role } = localStorage.getItem('auth')
      ? JSON.parse(localStorage.getItem('auth'))
      : {}
    const access = { create: false, update: false, delete: false }
    Object.keys(accessAchievementsForAdmin).forEach(function (key, index) {
      if (accessAchievementsForAdmin[key].indexOf(role) >= 0) {
        access[key] = true
      }
    })
    setAccess(access)
  }

  useEffect(() => {
    checkAccess()
  }, [])

  useEffect(() => {
    dispatch(fetchAchievements())
  }, [dispatch, achievements.keyword, achievements.page])

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Hapus Prestasi',
      text: 'Apakah Anda yakin ingin menghapus prestasi ini? Tindakan ini tidak dapat dibatalkan.',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteData(`/achievements/${id}`)
        dispatch(setNotif(true, 'success', 'Data berhasil dihapus'))
        dispatch(fetchAchievements())
      }
    })
  }

  const handleChangeStatus = (id, status) => {
    Swal.fire({
      title: 'Ubah Status Prestasi',
      text: 'Apakah Anda yakin ingin mengubah status prestasi ini?',
      showCancelButton: true,
      confirmButtonColor: '#1D2F6F',
      confirmButtonText: 'Ya, Ubah Status!',
      cancelButtonText: 'Batal',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const payload = {
          status: status === 'Belum Valid' ? 'Valid' : 'Belum Valid',
        }
        const res = await putData(`/achievements/${id}/status`, payload)

        dispatch(
          setNotif(
            true,
            'success',
            'Prestasi berhasil divalidasi',
          ),
        )

        dispatch(fetchAchievements())
      }
    })
  }

  return (
    <>
      <h1 className="fs-3">Prestasi</h1>
      <Breadcrumbs dashboardUrl="/admin/dashboard" secondLevelText="Prestasi" />
      <SearchInput
        query={achievements.keyword}
        handleChange={(e) => 
          dispatch(setKeyword(e.target.value),
            dispatch(setPage(1)),
          )}
      />
      {access.create && (
        <AppButton
          className="mb-3"
          action={() => navigate('/admin/achievements/create')}
        >
          Tambah
        </AppButton>
      )}
      {notif.status && (
        <AlertMessage variant={notif.typeNotif} message={notif.message} />
      )}
      <Table
        status={achievements.status}
        thead={[
          '#',
          'Nama Prestasi',
          'Tanggal',
          'Kelompok Kegiatan',
          'Jenis Kegiatan',
          'Jenis Prestasi',
          'Tingkat Kompetisi',
          'Status',
          'Bukti Prestasi',
          'Nama Mahasiswa',
          'Aksi',
        ]}
        data={achievements.data}
        tbody={[
          'name',
          'date',
          'activity_group',
          'activity_type',
          'achievement_type',
          'competition_level',
          'image',
          'status',
          'student_name',
        ]}
        editUrl={access.update ? '/admin/achievements/edit' : null}
        customAction={(id, status = '') => {
          return (
            <AppButton
              className={'mx-2'}
              variant='success'
              size={'sm'}
              action={() => handleChangeStatus(id, status)}
            >
              Ubah Status
            </AppButton>
          )
        }}
        deleteAction={access.delete ? (id) => handleDelete(id) : null}
        pages={achievements.pages}
        withPagination
        handlePageClick={({ selected }) => dispatch(setPage(selected + 1))}
      />
    </>
  )
} 

export default AchievementsPage
