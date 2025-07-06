import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { fetchAchievements, setPage} from '../../../redux/achievements/actions'
import { setNotif } from '../../../redux/notif/actions'
import { accessAchievementsForStudent } from '../../../constants/access'
import { deleteData } from '../../../utils/fetch'
import Breadcrumbs from '../../../components/Breadcrumbs'
import AppButton from '../../../components/Button'
import Table from '../../../components/TableWithAction'
import AlertMessage from '../../../components/AlertMessage'

const StudentAchievementsPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const notif = useSelector((state) => state.notif)
  const achievements = useSelector((state) => state.achievements)
  const id = useSelector((state) => state.auth?.id)
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
    Object.keys(accessAchievementsForStudent).forEach(function (key) {
      if (accessAchievementsForStudent[key].indexOf(role) >= 0) {
        access[key] = true
      }
    })
    setAccess(access)
  }

  useEffect(() => {
    checkAccess()
  }, [])

  useEffect(() => {
    if (id) {
      dispatch(fetchAchievements(id))
    }
  }, [dispatch, id, achievements.keyword, achievements.page])

  const handleDelete = (achievementId) => {
    Swal.fire({
      title: 'Hapus Prestasi',
      text: 'Apakah Anda yakin ingin menghapus prestasi ini? Tindakan ini tidak dapat dibatalkan.',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteData(`/achievements/${achievementId}`)
          dispatch(setNotif(true, 'success', 'Data berhasil dihapus'))
          dispatch(fetchAchievements(id))
        } catch (error) {
          dispatch(setNotif(true, 'danger', 'Gagal menghapus data'))
        }
      }
    })
  }

  return (
    <>
      <h1 className="fs-3">Prestasi Kamu</h1>
      <Breadcrumbs dashboardUrl="/student/dashboard" secondLevelText="Prestasi" />
      {access.create && (
        <AppButton
          className="mb-3"
          action={() => navigate('/student/achievements/create')}
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
          'Nama Prestasi',
          'Tanggal',
          'Kelompok Kegiatan',
          'Jenis Kegiatan',
          'Jenis Prestasi',
          'Tingkat Kompetisi',
          'Status',
          'Bukti Prestasi',
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
          'status',
          'image',
        ]}
        editUrl={access.update ? '/student/achievements/edit' : null}
        deleteAction={access.delete ? (achievementId) => handleDelete(achievementId) : null}
        pages={achievements.pages}
        withPagination
        handlePageClick={({ selected }) => dispatch(setPage(selected + 1))}
      />
    </>
  )
}

export default StudentAchievementsPage
