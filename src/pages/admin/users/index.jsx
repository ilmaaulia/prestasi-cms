import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { fetchStudents, setKeyword, setPage } from '../../../redux/students/actions'
import { setNotif } from '../../../redux/notif/actions'
import { accessUsers } from '../../../constants/access'
import { deleteData } from '../../../utils/fetch'
import Breadcrumbs from '../../../components/Breadcrumbs'
import AlertMessage from '../../../components/AlertMessage'
import Table from '../../../components/TableWithAction'
import SearchInput from '../../../components/SearchInput'

const UsersPage = () => {
  const dispatch = useDispatch()

  const notif = useSelector((state) => state.notif)
  const students = useSelector((state) => state.students)
  const [access, setAccess] = useState({
    update: false,
    delete: false,
  })

  const checkAccess = () => {
    let { role } = localStorage.getItem('auth')
      ? JSON.parse(localStorage.getItem('auth'))
      : {}
    const access = { update: false, delete: false }
    Object.keys(accessUsers).forEach(function (key, index) {
      if (accessUsers[key].indexOf(role) >= 0) {
        access[key] = true
      }
    })
    setAccess(access)
  }

  useEffect(() => {
    checkAccess()
  }, [])

  useEffect(() => {
    dispatch(fetchStudents())
  }, [dispatch, students.keyword, students.page])

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Hapus Pengguna',
      text: 'Apakah Anda yakin ingin menghapus pengguna ini? Tindakan ini tidak dapat dibatalkan.',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteData(`/students/${id}`)
        dispatch(setNotif(true, 'success', 'Data berhasil dihapus'))
        dispatch(fetchStudents())
      }
    })
  }

  return (
    <>
      <h1 className="fs-3">Pengguna</h1>
      <Breadcrumbs dashboardUrl="/admin/dashboard" secondLevelText="Pengguna" />
      <SearchInput
        query={students.keyword}
        handleChange={(e) => dispatch(setKeyword(e.target.value))}
        className={'mb-3'}
      />
      {notif.status && (
        <AlertMessage variant={notif.typeNotif} message={notif.message} />
      )}
      <Table
        status={students.status}
        thead={[
          'Nama Depan',
          'Nama Belakang',
          'NIM',
          'Program Studi',
          'Email',
          'Foto',
          'Status Akun',
          'Aksi',
        ]}
        data={students.data}
        tbody={[
          'firstName',
          'lastName',
          'student_id',
          'study_program',
          'email',
          'image',
          'status',
        ]}
        editUrl={access.update ? '/admin/users/edit' : null}
        deleteAction={access.delete ? (id) => handleDelete(id) : null}
        pages={students.pages}
        withPagination
        handlePageClick={({ selected }) => dispatch(setPage(selected + 1))}
      />
    </>
  )
}

export default UsersPage
