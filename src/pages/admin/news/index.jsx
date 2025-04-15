import React, { useEffect } from 'react'
import { Container, Table } from 'react-bootstrap'
import Breadcrumbs from '../../../components/Breadcrumb'
import AppButton from '../../../components/Button'
import Loading from '../../../components/Loading'
import { useNavigate } from 'react-router-dom'
import { getData } from '../../../utils/fetch'

const NewsPageAdmin = () => {
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

  return (
    <>
      <h1 className="fs-3">Berita</h1>
      <Breadcrumbs 
        textSecond='Berita'
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
                  <AppButton className="btn btn-danger ms-2" action={() => navigate(`/admin/news/delete/${data._id}`)}>Hapus</AppButton>
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

export default NewsPageAdmin
