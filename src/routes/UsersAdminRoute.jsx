import { Route, Routes } from 'react-router-dom'
import UsersPageAdmin from '../pages/admin/users'
import UsersEdit from '../pages/admin/users/edit'

const UsersAdminRoute = () => (
  <Routes>
    <Route index element={<UsersPageAdmin />} />
    <Route path="edit/:id" element={<UsersEdit />} />
  </Routes>
)

export default UsersAdminRoute
