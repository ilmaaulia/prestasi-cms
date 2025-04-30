import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import Breadcrumbs from '../../../components/Breadcrumbs'
import AppButton from '../../../components/Button'
import Loading from '../../../components/Loading'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getData, deleteData } from '../../../utils/fetch'
import { config } from '../../../config'

const StudentAchievementsPage = () => {
  const [student, setStudent] = React.useState(null)
  const [achievements, setAchievements] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  const navigate = useNavigate()
  const id = useSelector((state) => state.auth?.id)
  
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await getData(`/students/${id}`)
        setStudent(res.data.data)
      } catch (err) {
        console.error('Error fetching student:', err)
      }
    }
    
    const fetchAchievements = async () => {
      try {
        const res = await getData(`/achievements?student=${id}`)
        setAchievements(res.data.data || [])
      } catch (err) {
        console.error('Error fetching achievements:', err)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchStudent()
      fetchAchievements()
    }
  }, [id])

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus prestasi ini?')) {
      try {
        await deleteData(`/achievements/${id}`)
        setAchievements(achievements.filter(item => item._id !== id))
      } catch (error) {
        console.error('Error deleting achievement:', error)
      }
    }
  }

  return (
    <>
      <h1 className="fs-3">Prestasi Kamu</h1>
      <Breadcrumbs 
        dashboardUrl='/student/dashboard'
        secondLevelText='Prestasi' 
      />
      <AppButton className="mb-2" action={() => navigate('/student/achievements/create')}>Tambah</AppButton>
      <Table responsive striped bordered hover className="w-100">
        <thead className="text-center">
          <tr>
            <th>#</th>
            <th>Nama Prestasi</th>
            <th>Tanggal</th>
            <th>Kelompok Kegiatan</th>
            <th>Jenis Kegiatan</th>
            <th>Jenis Prestasi</th>
            <th>Tingkat Kompetisi</th>
            <th>Bukti Prestasi</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="11" className="text-center">
                <Loading />
              </td>
            </tr>
          ) : achievements.length > 0 ? (
            achievements.map((data, index) => (
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
                <td className="text-center">
                  <div
                    className={`d-inline-block rounded-circle me-2 ${
                      data.status === 'Valid'
                        ? 'bg-success'
                        : data.status === 'Tidak Valid'
                          ? 'bg-danger'
                          : 'bg-warning'
                    }`}
                    style={{ width: '10px', height: '10px' }}
                  ></div>
                  {data.status}
                </td>
                <td className="text-center text-nowrap">
                  <AppButton className="btn btn-primary" action={() => navigate(`/student/achievements/edit/${data._id}`)}>Edit</AppButton>
                  <AppButton className="btn btn-danger ms-2" action={() => handleDelete(data._id)}>Hapus</AppButton>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11" className="text-center">Tidak ada data</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  )
} 

export default StudentAchievementsPage
