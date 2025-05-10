import { Route, Routes } from 'react-router-dom'
import StudentProfilePage from '../pages/students/profile'
import StudentProfilEdit from '../pages/students/profile/edit'

const StudentProfileRoute = () => (
  <Routes>
    <Route path=":id" element={<StudentProfilePage />} />
    <Route path=":id/edit" element={<StudentProfilEdit />} />
  </Routes>
)

export default StudentProfileRoute
