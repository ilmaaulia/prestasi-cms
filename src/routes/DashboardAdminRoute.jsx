import { Route, Routes } from 'react-router-dom'
import DashboardPageAdmin from '../pages/admin/dashboard'

const DashboardAdminRoute = () => (
  <Routes>
    <Route index element={<DashboardPageAdmin />} />
  </Routes>
)

export default DashboardAdminRoute
