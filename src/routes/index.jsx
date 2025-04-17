import { Route, Routes } from 'react-router-dom'
import GuardRoute from '../components/GuardRoute'
import GuestOnlyRoute from '../components/GuestOnlyRoute'

import LoginPageAdmin from '../pages/admin/login'
import Layout from '../layout'
import DashboardAdminRoute from './DashboardAdminRoute'
import AchievementsAdminRoute from './AchievementsAdminRoute'
import NewsAdminRoute from './NewsAdminRoute'
import UsersAdminRoute from './UsersAdminRoute'

import DashboardStudentRoute from './DashboardStudentRoute'
import AchievementsStudentRoute from './AchievementsStudentRoute'
import ProfileStudentRoute from './ProfileStudentRoute'

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="login"
        element={
          <GuestOnlyRoute>
            <LoginPageAdmin />
          </GuestOnlyRoute>
        }
      />

      <Route
        path="/*"
        element={
          <GuardRoute>
            <Layout />
          </GuardRoute>
        }
      >
        <Route path="admin/dashboard/*" element={<DashboardAdminRoute />} />
        <Route path="admin/achievements/*" element={<AchievementsAdminRoute />} />
        <Route path="admin/users/*" element={<UsersAdminRoute />} />
        <Route path="admin/news/*" element={<NewsAdminRoute />} />
        <Route path="student/dashboard/*" element={<DashboardStudentRoute />} />
        <Route path="student/achievements/*" element={<AchievementsStudentRoute />} />
        <Route path="student/profile/:id" element={<ProfileStudentRoute />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
