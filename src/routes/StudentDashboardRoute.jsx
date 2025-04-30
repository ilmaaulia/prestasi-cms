import { Route, Routes } from 'react-router-dom'
import DashboardPageStudent from '../pages/students/dashboard'

const DashboardStudentRoute = () => (
  <Routes>
    <Route index element={<DashboardPageStudent />} />
  </Routes>
)

export default DashboardStudentRoute
