import { Route, Routes } from 'react-router-dom'
import GuardRoute from '../components/GuardRoute'
import GuestOnlyRoute from '../components/GuestOnlyRoute'

import LoginPage from '../pages/admin/login'
import Layout from '../layout'
import DashboardRoute from './DashboardRoute'
import AchievementsRoute from './AchievementsRoute'
import NewsRoute from './NewsRoute'
import UsersRoute from './UsersRoute'

import StudentDashboardRoute from './StudentDashboardRoute'
import StudentAchievementsRoute from './StudentAchievementsRoute'
import StudentProfileRoute from './StudentProfileRoute'
import StudentRegistrationPage from '../pages/students/register'
import OtpPage from '../pages/students/register/otp'

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="login"
        element={
          <GuestOnlyRoute>
            <LoginPage />
          </GuestOnlyRoute>
        }
      />

      <Route
        path="register"
        element={
          <GuestOnlyRoute>
            <StudentRegistrationPage />
          </GuestOnlyRoute>
        }
      />

      <Route
        path="/register/otp"
        element={
          <GuestOnlyRoute>
            <OtpPage />
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
                <Route path="dashboard/*" element={<DashboardRoute />} />
                <Route path="achievements/*" element={<AchievementsRoute />} />
                <Route path="users/*" element={<UsersRoute />} />
                <Route path="news/*" element={<NewsRoute />} />
              </Routes>
            </GuardRoute>
          }
        />

        <Route
          path="student/*"
          element={
            <GuardRoute userRole="student">
              <Routes>
                <Route path="dashboard/*" element={<StudentDashboardRoute />} />
                <Route path="achievements/*" element={<StudentAchievementsRoute />} />
                <Route path="profile/*" element={<StudentProfileRoute />} />
              </Routes>
            </GuardRoute>
          }
        />
      </Route>
    </Routes>
  )
}

export default AppRoutes
