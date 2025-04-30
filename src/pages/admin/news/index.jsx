import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import Breadcrumbs from '../../../components/Breadcrumbs'
import AppButton from '../../../components/Button'
import Loading from '../../../components/Loading'
import { useNavigate } from 'react-router-dom'
import { getData, deleteData } from '../../../utils/fetch'

const NewsPage = () => {
  const navigate = useNavigate()

  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getData('/newses')
        setData(res.data.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      try {
        await deleteData(`/news/${id}`)
        setData(data.filter(item => item._id !== id))
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <>
      <h1 className="fs-3">Berita</h1>
      <Breadcrumbs 
        dashboardUrl='/admin/dashboard'
        secondLevelText='Berita'
      />
      <AppButton action={() => navigate('/admin/news/create')}>Tambah</AppButton>
      <Table responsive striped bordered hover className="w-100">
        <thead className="text-center">
          <tr>
            <th>No</th>
            <th>Judul Berita</th>
            <th>Isi Berita</th>
            <th>Penulis</th>
            <th>Tanggal Dibuat</th>
            <th>Tanggal Diperbarui</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="7" className="text-center">
                <Loading />
              </td>
            </tr>
          ) : data.length > 0 ? (
            data.map((data, index) => (
              <tr key={data._id}>
                <td className="text-center">{index + 1}</td>
                <td>{data.title}</td>
                <td>{data.content.length > 50 ? `${data.content.slice(0, 50)}...` : data.content}</td>
                <td>{data.author || 'Tidak ada penulis'}</td>
                <td>{new Date(data.createdAt).toLocaleDateString()}</td>
                <td>{new Date(data.updatedAt).toLocaleDateString()}</td>
                <td className="text-center text-nowrap">
                  <AppButton className="btn btn-primary" action={() => navigate(`/admin/news/edit/${data._id}`)}>Edit</AppButton>
                  <AppButton className="btn btn-danger ms-2" action={() => handleDelete(data._id)}>Hapus</AppButton>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">Tidak ada data</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  )
} 

export default NewsPage
