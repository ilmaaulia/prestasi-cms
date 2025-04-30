import { Route, Routes } from 'react-router-dom'
import DashboardPage from '../pages/admin/dashboard'

const DashboardRoute = () => (
  <Routes>
    <Route index element={<DashboardPage />} />
  </Routes>
)

export default DashboardRoute
