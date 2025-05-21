import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { fetchStudents, setKeyword } from '../../../redux/students/actions'
import { setNotif } from '../../../redux/notif/actions'
import { accessUsers } from '../../../constants/access'
import { deleteData } from '../../../utils/fetch'
import Breadcrumbs from '../../../components/Breadcrumbs'
import AppButton from '../../../components/Button'
import AlertMessage from '../../../components/AlertMessage'
import Table from '../../../components/TableWithAction'
import SearchInput from '../../../components/SearchInput'

const UsersPage = () => {
  const navigate = useNavigate()
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
  }, [dispatch, students.keyword])

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Apakah anda yakin?',
      text: 'Anda tidak akan dapat mengembalikan ini!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#d33',
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
      />
      {notif.status && (
        <AlertMessage variant={notif.typeNotif} message={notif.message} />
      )}
      <Table
        status={students.status}
        thead={[
          '#',
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
      />
    </>
  )
}

export default UsersPage
