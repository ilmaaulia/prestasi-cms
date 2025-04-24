import { Route, Routes } from 'react-router-dom'
import ProfilePage from '../pages/students/profile'

const ProfileStudentRoute = () => (
  <Routes>
    <Route index element={<ProfilePage />} />
  </Routes>
)

export default ProfileStudentRoute
