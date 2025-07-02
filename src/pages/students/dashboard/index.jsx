import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getData } from '../../../utils/fetch'
import LatestNews from '../../../components/LatestNews'
import LatestAchievements from '../../../components/LatestAchievements'
import DashboardStats from './dashboard-stats'
import Breadcrumbs from '../../../components/Breadcrumbs'
import Loading from '../../../components/Loading'

const StudentDashboardPage = () => {
  const [student, setStudent] = useState(null)
  const [achievements, setAchievements] = useState([])
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)

  const id = useSelector((state) => state.auth?.id)

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const res = await getData(`/students/${id}`)
        setStudent(res.data.data)
      } catch (err) {
        console.error('Error fetching student:', err)
      } finally {
        setLoading(false)
      }
    }

    const fetchAchievements = async () => {
      try {
        const res = await getData(`/achievements?student=${id}&status=Valid`)
        setAchievements(res.data.data.data || [])
      } catch (err) {
        console.error('Error fetching achievements:', err)
      } finally {
        setLoading(false)
      }
    }

    const fetchNews = async () => {
      try {
        const res = await getData('/newses')
        setNews(res.data.data || [])
      } catch (err) {
        console.error('Error fetching news:', err)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchStudentData()
      fetchAchievements()
      fetchNews()
    }
  }, [id])

  const getRelevantTags = () => {
    const tagSet = new Set()

    achievements.forEach((a) => {
      if (a.activity_group) tagSet.add(a.activity_group)
      if (a.activity_type) tagSet.add(a.activity_type)
      if (a.achievement_type) tagSet.add(a.achievement_type)
      if (a.competition_level) tagSet.add(a.competition_level)
    })

    return Array.from(tagSet).slice(0, 10)
  }

  const tagColors = ['primary', 'success', 'warning', 'danger', 'info', 'secondary']

  return (
    <>
      <Breadcrumbs dashboardUrl='/student/dashboard'/>
      <h2 className="mb-4">Halo, {student?.firstName || '{nama}'}!</h2>
      {loading ? (
        <Loading />
      ) : (
        <>
          <DashboardStats
            achievements={achievements}
            getRelevantTags={getRelevantTags}
            tagColors={tagColors}
          />
          <LatestAchievements />
          <LatestNews news={news} />
        </>
      )}
    </>
  )
}

export default StudentDashboardPage
