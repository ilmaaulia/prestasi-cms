import React, { useEffect, useState } from 'react'
import { getData } from '../../utils/fetch'
import Table from '../../components/TableWithAction'

const LatestAchievements = () => {
  const [achievements, setAchievements] = useState([])

  const fetchLatestAchievements = async () => {
    const res = await getData('/achievements?sort=date:desc&limit=5&status=Valid')
    setAchievements(res.data.data.data)
  }

  useEffect(() => {
    fetchLatestAchievements()
  }, [])
  
  const data = achievements.map(item => ({
    ...item,
    student_name: item.student ? `${item.student.firstName} ${item.student.lastName}` : '-',
  }))

  return (
    <div className="my-4">
      <h2 className="mb-4">Prestasi Terbaru</h2>
      <Table
        thead={[
          'Nama Prestasi',
          'Tanggal',
          'Kelompok Kegiatan',
          'Jenis Kegiatan',
          'Jenis Prestasi',
          'Tingkat Kompetisi',
          'Nama Mahasiswa',
        ]}
        data={data}
        tbody={[
          'name',
          'date',
          'activity_group',
          'activity_type',
          'achievement_type',
          'competition_level',
          'student_name',
        ]}
        actionNotDisplay
      />
    </div>
  )
}

export default LatestAchievements
