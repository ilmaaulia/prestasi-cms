import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { fetchNews, setKeyword } from '../../../redux/news/actions'
import { setNotif } from '../../../redux/notif/actions'
import { accessNews } from '../../../constants/access'
import { deleteData } from '../../../utils/fetch'
import Breadcrumbs from '../../../components/Breadcrumbs'
import SearchInput from '../../../components/SearchInput'
import AppButton from '../../../components/Button'
import AlertMessage from '../../../components/AlertMessage'
import Table from '../../../components/TableWithAction'

const NewsPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const notif = useSelector((state) => state.notif)
  const news = useSelector((state) => state.news)

  const [access, setAccess] = useState({
    create: false,
    update: false,
    delete: false,
  })

  const checkAccess = () => {
    let { role } = localStorage.getItem('auth')
      ? JSON.parse(localStorage.getItem('auth'))
      : {}
    const access = { tambah: false, hapus: false, edit: false }
    Object.keys(accessNews).forEach(function (key, index) {
      if (accessNews[key].indexOf(role) >= 0) {
        access[key] = true
      }
    })
    setAccess(access)
  }

  useEffect(() => {
    checkAccess()
  }, [])

  useEffect(() => {
    dispatch(fetchNews())
  }, [dispatch, news.keyword])

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
        await deleteData(`/news/${id}`)
        dispatch(setNotif(true, 'success', 'Data berhasil dihapus'))
        dispatch(fetchNews())
      }
    })
  }

  return (
    <>
      <h1 className="fs-3">Berita</h1>
      <Breadcrumbs dashboardUrl="/admin/dashboard" secondLevelText="Berita" />
      <SearchInput
        query={news.keyword}
        handleChange={(e) => dispatch(setKeyword(e.target.value))}
      />
      {access.create && (
        <AppButton
          className="mb-3"
          action={() => navigate('/admin/news/create')}
        >
          Tambah
        </AppButton>
      )}
      {notif.status && (
        <AlertMessage variant={notif.typeNotif} message={notif.message} />
      )}
      <Table
        status={news.status}
        thead={[
          '#',
          'Judul Berita',
          'Isi Berita',
          'Penulis',
          'Gambar',
          'Tanggal Dibuat',
          'Tanggal Diperbarui',
          'Aksi',
        ]}
        data={news.data}
        tbody={[
          'title',
          'content',
          'author',
          'createdAt',
          'updatedAt',
          'image',
        ]}
        editUrl={access.update ? '/admin/news/edit' : null}
        deleteAction={access.delete ? (id) => handleDelete(id) : null}
      />
    </>
  )
}

export default NewsPage
