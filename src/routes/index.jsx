import { Route, Routes } from 'react-router-dom'
import GuardRoute from '../components/GuardRoute'
import GuestOnlyRoute from '../components/GuestOnlyRoute'

import LoginPageAdmin from '../pages/admin/login'
import AdminLayout from '../layouts/AdminLayout'
import DashboardAdminRoute from './DashboardAdminRoute'
import AchievementsAdminRoute from './AchievementsAdminRoute'
import NewsAdminRoute from './NewsAdminRoute'
import UsersAdminRoute from './UsersAdminRoute'

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="admin/login"
        element={
          <GuestOnlyRoute>
            <LoginPageAdmin />
          </GuestOnlyRoute>
        }
      />

      <Route
        path="admin/*"
        element={
          <GuardRoute>
            <AdminLayout />
          </GuardRoute>
        }
      >
        <Route path="dashboard/*" element={<DashboardAdminRoute />} />
        <Route path="achievements/*" element={<AchievementsAdminRoute />} />
        <Route path="users/*" element={<UsersAdminRoute />} />
        <Route path="news/*" element={<NewsAdminRoute />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
