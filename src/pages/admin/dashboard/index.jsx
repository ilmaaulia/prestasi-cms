import { useState, useEffect } from 'react'
import Breadcrumbs from '../../../components/Breadcrumbs'
import Loading from '../../../components/Loading'
import DashboardStats from '../../../components/DashboardStats'
import { getData } from '../../../utils/fetch'

const DashboardPage = () => {
  const [totalUsers, setTotalUsers] = useState(0)
  const [totalAchievements, setTotalAchievements] = useState(0)
  const [totalNews, setTotalNews] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsResponse, achievementsResponse, newsResponse] = await Promise.all([
          getData('/students'),
          getData('/achievements'),
          getData('/newses'),
        ])

        setTotalUsers(studentsResponse.data.data.length)
        setTotalAchievements(achievementsResponse.data.data.length)
        setTotalNews(newsResponse.data.data.length)
      } catch (err) {
        console.error('Error fetching dashboard data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <h1 className="fs-3">Dashboard</h1>
      <Breadcrumbs dashboardUrl='/admin/dashboard' />
      {loading ? (
        <Loading />
      ) : (
        <DashboardStats
          totalUsers={totalUsers}
          totalAchievements={totalAchievements}
          totalNews={totalNews}
        />
      )}
    </>
  )
}

export default DashboardPage
