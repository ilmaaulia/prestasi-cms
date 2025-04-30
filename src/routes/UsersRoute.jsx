import { Route, Routes } from 'react-router-dom'
import UsersPage from '../pages/admin/users'
import UsersEdit from '../pages/admin/users/edit'

const UsersRoute = () => (
  <Routes>
    <Route index element={<UsersPage />} />
    <Route path="edit/:id" element={<UsersEdit />} />
  </Routes>
)

export default UsersRoute
