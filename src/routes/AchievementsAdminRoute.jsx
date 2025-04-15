import { Route, Routes } from 'react-router-dom'
import AchievementsPageAdmin from '../pages/admin/achievements'
import AchievementsCreate from '../pages/admin/achievements/create'
import AchievementsEdit from '../pages/admin/achievements/edit'

const AchievementsAdminRoute = () => (
  <Routes>
    <Route index element={<AchievementsPageAdmin />} />
    <Route path="create" element={<AchievementsCreate />} />
    <Route path="edit/:id" element={<AchievementsEdit />} />
  </Routes>
)

export default AchievementsAdminRoute
