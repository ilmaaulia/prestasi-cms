import React, { useEffect } from 'react'
import { Container, Table } from 'react-bootstrap'
import Breadcrumbs from '../../../components/Breadcrumbs'
import AppButton from '../../../components/Button'
import Loading from '../../../components/Loading'
import { useNavigate } from 'react-router-dom'
import { getData, deleteData } from '../../../utils/fetch'
import { config } from '../../../config'

const AchievementsPageAdmin = () => {
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  const navigate = useNavigate()
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getData('/achievements')
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
        await deleteData(`/achievements/${id}`)
        setData(data.filter(item => item._id !== id))
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <>
      <h1 className="fs-3">Prestasi</h1>
      <Breadcrumbs
        dashboardUrl='/admin/dashboard'
        secondLevelText='Prestasi'
      />
      <AppButton className="mb-2" action={() => navigate('/admin/achievements/create')}>Tambah</AppButton>
      <Table responsive striped bordered hover className="w-100">
        <thead className="text-center">
          <tr>
            <th>No</th>
            <th>Nama Prestasi</th>
            <th>Tanggal</th>
            <th>Kelompok Kegiatan</th>
            <th>Jenis Kegiatan</th>
            <th>Jenis Prestasi</th>
            <th>Tingkat Kompetisi</th>
            <th>Bukti Prestasi</th>
            <th>Status</th>
            <th>Nama Mahasiswa</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="10" className="text-center">
                <Loading />
              </td>
            </tr>
          ) : data.length > 0 ? (
            data.map((data, index) => (
              <tr key={data._id}>
                <td className="text-center">{index + 1}</td>
                <td>{data.name}</td>
                <td>{new Date(data.date).toLocaleDateString()}</td>
                <td>{data.activity_group}</td>
                <td>{data.activity_type}</td>
                <td>{data.achievement_type}</td>
                <td>{data.competition_level}</td>
                <td>
                  <img src={`${config.image_base_url}/${data.image?.name}`} alt="Bukti Prestasi" width={50}/>
                </td>
                <td className="text-center">{data.status}</td>
                <td>{`${data.student.firstName} ${data.student.lastName}`}</td>
                <td className="text-center text-nowrap">
                  <AppButton className="btn btn-primary" action={() => navigate(`/admin/achievements/edit/${data._id}`)}>Edit</AppButton>
                  <AppButton className="btn btn-danger ms-2" action={() => handleDelete(data._id)}>Hapus</AppButton>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="text-center">Tidak ada data</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  )
} 

export default AchievementsPageAdmin
