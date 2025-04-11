import { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import Breadcrumbs from '../../../components/Breadcrumb'
import SidebarAdmin from '../../../components/SidebarAdmin'
import Loading from '../../../components/Loading'
import Hamburger from '../../../components/Hamburger'
import DashboardStats from '../../../components/DashboardStats'
import { getData } from '../../../utils/fetch'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { userLogout } from '../../../redux/auth/actions'

const DashboardPageAdmin = () => {
  const [show, setShow] = useState(false)
  const [totalUsers, setTotalUsers] = useState(0)
  const [totalAchievements, setTotalAchievements] = useState(0)
  const [totalNews, setTotalNews] = useState(0)
  const [loading, setLoading] = useState(true)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const handleLogout = () => {
    dispatch(userLogout())
    navigate('/admin/login')
  }

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
    <div className="d-flex vh-100">
      <SidebarAdmin show={show} handleClose={handleClose} handleLogout={handleLogout} />

      <Container fluid className="d-flex flex-column p-0">
        <Hamburger handleShow={handleShow} />
        <main className="p-5 vh-100">
          <h1 className="fs-3">Dashboard</h1>
          <Breadcrumbs />
          {loading ? (
            <Loading />
          ) : (
            <DashboardStats
              totalUsers={totalUsers}
              totalAchievements={totalAchievements}
              totalNews={totalNews}
            />
          )}
        </main>
      </Container>
    </div>
  )
}

export default DashboardPageAdmin
