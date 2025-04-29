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
import StudentSignupPage from '../pages/students/register'

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
        path="register"
        element={
          <GuestOnlyRoute>
            <StudentSignupPage />
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
        <Route
          path="admin/*"
          element={
            <GuardRoute userRole="admin">
              <Routes>
                <Route path="dashboard/*" element={<DashboardAdminRoute />} />
                <Route path="achievements/*" element={<AchievementsAdminRoute />} />
                <Route path="users/*" element={<UsersAdminRoute />} />
                <Route path="news/*" element={<NewsAdminRoute />} />
              </Routes>
            </GuardRoute>
          }
        />

        <Route
          path="student/*"
          element={
            <GuardRoute userRole="student">
              <Routes>
                <Route path="dashboard/*" element={<DashboardStudentRoute />} />
                <Route path="achievements/*" element={<AchievementsStudentRoute />} />
                <Route path="profile/:id" element={<ProfileStudentRoute />} />
              </Routes>
            </GuardRoute>
          }
        />
      </Route>
    </Routes>
  )
}

export default AppRoutes
