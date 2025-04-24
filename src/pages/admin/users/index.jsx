import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import Breadcrumbs from '../../../components/Breadcrumbs'
import Loading from '../../../components/Loading'
import AppButton from '../../../components/Button'
import { useNavigate } from 'react-router-dom'
import { getData, deleteData } from '../../../utils/fetch'
import { config } from '../../../config'

const UsersPageAdmin = () => {
  const navigate = useNavigate()

  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getData('/students')
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
        await deleteData(`/students/${id}`)
        setData(data.filter(item => item._id !== id))
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <>
      <h1 className="fs-3">Pengguna</h1>
      <Breadcrumbs 
        dashboardUrl='/admin/dashboard'
        secondLevelText="Pengguna" 
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
                <td>{data.firstName} {data.lastName}</td>
                <td>{data.student_id}</td>
                <td>{data.study_program}</td>
                <td>{data.email}</td>
                <td className="text-center">
                  <img
                    src={`${config.image_base_url}/${data.image?.name}`}
                    alt="User"
                    width={50}
                    height={50}
                    style={{ objectFit: 'cover', borderRadius: '50%' }}
                  />
                </td>
                <td className="text-center">{data.status}</td>
                <td className="text-center text-nowrap">
                  <AppButton className="btn btn-primary" action={() => navigate(`/admin/users/edit/${data._id}`)}>Edit</AppButton>
                  <AppButton className="btn btn-danger ms-2" action={() => handleDelete(data._id)}>Hapus</AppButton>
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
    </>
  )
}

export default UsersPageAdmin
