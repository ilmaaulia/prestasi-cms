import { Route, Routes } from 'react-router-dom'
import AchievementsPageStudent from '../pages/students/achievements'
import AchievementsCreate from '../pages/students/achievements/create'
import AchievementsEdit from '../pages/students/achievements/edit'

const AchievementsStudentsRoute = () => (
  <Routes>
    <Route index element={<AchievementsPageStudent/>} />
    <Route path="create" element={<AchievementsCreate/>} />
    <Route path="edit/:id" element={<AchievementsEdit/>} />
  </Routes>
)

export default AchievementsStudentsRoute
