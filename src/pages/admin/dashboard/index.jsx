import { useState, useEffect } from 'react'
import { Container, Navbar, Card, Row, Col, Spinner } from 'react-bootstrap'
import { Navigate } from 'react-router-dom'
import { config } from '../../../config'
import Breadcrumbs from '../../../components/Breadcrumb'
import SidebarAdmin from '../../../components/SidebarAdmin'
import Loading from '../../../components/Loading'
import Hamburger from '../../../components/Hamburger'
import DashboardStats from '../../../components/DashboardStats'
import axios from 'axios'

const DashboardPageAdmin = () => {
  const token = localStorage.getItem('token')

  const [show, setShow] = useState(false)
  const [totalUsers, setTotalUsers] = useState(0)
  const [totalAchievements, setTotalAchievements] = useState(0)
  const [totalNews, setTotalNews] = useState(0)
  const [loading, setLoading] = useState(true)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/admin/login'
  }

  const API_URL = config.api_host_dev
  const GET_ALL_STUDENTS = `${API_URL}/students`
  const GET_ALL_ACHIEVEMENTS = `${API_URL}/achievements`
  const GET_ALL_NEWSES = `${API_URL}/newses`

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsResponse, achievementsResponse, newsResponse] = await Promise.all([
          axios.get(GET_ALL_STUDENTS),
          axios.get(GET_ALL_ACHIEVEMENTS),
          axios.get(GET_ALL_NEWSES),
        ])

        setTotalUsers(studentsResponse.data.data.length)
        setTotalAchievements(achievementsResponse.data.data.length)
        setTotalNews(newsResponse.data.data.length)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (!token) return <Navigate to={'/admin/login'} replace={true} />

  return (
    <div className="d-flex vh-100">
      <SidebarAdmin show={show} handleClose={handleClose} handleLogout={handleLogout} />

      <Container fluid className="d-flex flex-column p-0">
        <Hamburger handleShow={handleShow} />
        <main className="p-5 vh-100">
          <h1 className="fs-3">Dashboard</h1>
          <Breadcrumbs />
          {loading ? <Loading /> : (
            <DashboardStats totalUsers={totalUsers} totalAchievements={totalAchievements} totalNews={totalNews} />
          )}
        </main>
      </Container>
    </div>
  )
}

export default DashboardPageAdmin
