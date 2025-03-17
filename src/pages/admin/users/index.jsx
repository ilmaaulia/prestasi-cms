import React, { useEffect } from 'react'
import { Container, Table } from 'react-bootstrap'
import Breadcrumbs from '../../../components/Breadcrumb'
import SidebarAdmin from '../../../components/SidebarAdmin'
import Loading from '../../../components/Loading'
import Hamburger from '../../../components/Hamburger'
import { config } from '../../../config'
import axios from 'axios'

const UsersPageAdmin = () => {
  const token = localStorage.getItem('token')
  const [show, setShow] = React.useState(false)
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/admin/login'
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${config.api_host_dev}/students`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

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
          <h1 className="fs-3">Pengguna</h1>
          <Breadcrumbs 
            textSecond='Pengguna'
          />
          <Table responsive striped bordered hover className="w-100">
            <thead className="text-center">
              <tr>
                <th>No</th>
                <th>Nama Lengkap</th>
                <th>NIM</th>
                <th>Program Studi</th>
                <th>Email</th>
                <th>Foto</th>
                <th>Status Akun</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="text-center">
                    <Loading />
                  </td>
                </tr>
              ) : data.length > 0 ? (
                data.map((data, index) => (
                  <tr key={index}>
                    <td className="text-center">{index + 1}</td>
                    <td>{data.firstName}</td>
                    <td>{data.student_id}</td>
                    <td>{data.study_program}</td>
                    <td>{data.email}</td>
                    <td className="text-center">
                      <img src={`${config.image_base_url}/${data.image?.name}`} alt="User" width={150} />
                    </td>
                    <td className="text-center">{data.status}</td>
                    <td className="d-flex gap-2 flex-row justify-content-center">
                      <button className="btn btn-primary">Edit</button>
                      <button className="btn btn-danger">Hapus</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">Tidak ada data</td>
                </tr>
              )}
            </tbody>
          </Table>
        </main>
      </Container>
    </div>
  )
} 

export default UsersPageAdmin
