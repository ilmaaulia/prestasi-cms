import { Route, Routes } from 'react-router-dom'
import StudentAchievementsPage from '../pages/students/achievements'
import AchievementsCreate from '../pages/students/achievements/create'
import AchievementsEdit from '../pages/students/achievements/edit'

const StudentAchievementsRoute = () => (
  <Routes>
    <Route index element={<StudentAchievementsPage/>} />
    <Route path="create" element={<AchievementsCreate/>} />
    <Route path="edit/:id" element={<AchievementsEdit/>} />
  </Routes>
)

export default StudentAchievementsRoute
