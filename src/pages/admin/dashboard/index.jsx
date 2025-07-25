import { useState, useEffect } from 'react'
import Breadcrumbs from '../../../components/Breadcrumbs'
import Loading from '../../../components/Loading'
import LatestAchievements from '../../../components/LatestAchievements'
import LatestNews from '../../../components/LatestNews'
import DashboardStats from './dashboard-stats'
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
          getData('/achievements?status=Valid'),
          getData('/newses'),
        ])

        setTotalUsers(studentsResponse.data.data.total)
        setTotalAchievements(achievementsResponse.data.data.total)
        setTotalNews(newsResponse.data.data.total)
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
        <>
          <DashboardStats
            totalUsers={totalUsers}
            totalAchievements={totalAchievements}
            totalNews={totalNews}
          />
          <LatestAchievements />
          <LatestNews />
        </>
      )}
    </>
  )
}

export default DashboardPage
