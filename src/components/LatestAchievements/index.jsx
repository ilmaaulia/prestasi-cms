import React, { useEffect, useState } from 'react'
import { getData } from '../../utils/fetch'
import { Table } from 'react-bootstrap'
import Loading from '../../components/Loading'

const LatestAchievements = () => {
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await getData('/achievements?sort=date:desc&limit=5')
        setData(response.data.data)
      } catch (error) {
        console.error('Error fetching achievements:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAchievements()
  }, [])

  return (
    <>
      <h2 className="my-4">Prestasi Terbaru</h2>
      <Table responsive striped bordered hover className="w-100 mb-4">
        <thead className="text-center">
          <tr>
            <th>#</th>
            <th>Nama Prestasi</th>
            <th>Tanggal</th>
            <th>Kelompok Kegiatan</th>
            <th>Jenis Kegiatan</th>
            <th>Jenis Prestasi</th>
            <th>Tingkat Kompetisi</th>
            <th>Nama Mahasiswa</th>
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
                <td>{data.name}</td>
                <td>{new Date(data.date).toLocaleDateString()}</td>
                <td>{data.activity_group}</td>
                <td>{data.activity_type}</td>
                <td>{data.achievement_type}</td>
                <td>{data.competition_level}</td>
                <td>{`${data.student.firstName} ${data.student.lastName}`}</td>
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

export default LatestAchievements
