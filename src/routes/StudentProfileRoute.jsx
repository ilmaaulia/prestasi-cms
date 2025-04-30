import { Route, Routes } from 'react-router-dom'
import StudentProfilePage from '../pages/students/profile'

const StudentProfileRoute = () => (
  <Routes>
    <Route index element={<StudentProfilePage />} />
  </Routes>
)

export default StudentProfileRoute
