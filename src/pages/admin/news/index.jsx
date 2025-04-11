import React, { useEffect } from 'react'
import { Container, Table } from 'react-bootstrap'
import Breadcrumbs from '../../../components/Breadcrumb'
import AppButton from '../../../components/Button'
import SidebarAdmin from '../../../components/SidebarAdmin'
import Loading from '../../../components/Loading'
import Hamburger from '../../../components/Hamburger'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getData } from '../../../utils/fetch'
import { userLogout } from '../../../redux/auth/actions'

const NewsPageAdmin = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [show, setShow] = React.useState(false)
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const handleLogout = () => {
    dispatch(userLogout())
    navigate('/admin/login')
  }

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
    <div className="d-flex vh-100">
      <SidebarAdmin show={show} handleClose={handleClose} handleLogout={handleLogout} />

      <Container fluid className="d-flex flex-column p-0 overflow-hidden">
        <Hamburger handleShow={handleShow} />
        <main className="p-5 vh-100 overflow-auto">
          <h1 className="fs-3">Berita</h1>
          <Breadcrumbs 
            textSecond='Berita'
          />
          <AppButton action={() => navigate('/categories/create')}>Tambah</AppButton>
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
                data.map((item, index) => (
                  <tr key={item._id}>
                    <td className="text-center">{index + 1}</td>
                    <td>{item.title}</td>
                    <td>{item.content}</td>
                    <td>{item.author || 'Tidak ada penulis'}</td>
                    <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                    <td>{new Date(item.updatedAt).toLocaleDateString()}</td>
                    <td className="text-center text-nowrap">
                      <button className="btn btn-primary">Edit</button>
                      <button className="btn btn-danger ms-2">Hapus</button>
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
        </main>
      </Container>
    </div>
  )
} 

export default NewsPageAdmin
