import { Route, Routes } from 'react-router-dom'
import AchievementsPage from '../pages/admin/achievements'
import AchievementsCreate from '../pages/admin/achievements/create'
import AchievementsEdit from '../pages/admin/achievements/edit'

const AchievementsRoute = () => (
  <Routes>
    <Route index element={<AchievementsPage />} />
    <Route path="create" element={<AchievementsCreate />} />
    <Route path="edit/:id" element={<AchievementsEdit />} />
  </Routes>
)

export default AchievementsRoute
