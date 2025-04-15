import { Route, Routes } from 'react-router-dom'
import NewsPageAdmin from '../pages/admin/news'
import NewsCreate from '../pages/admin/news/create'
import NewsEdit from '../pages/admin/news/edit'

const NewsAdminRoute = () => (
  <Routes>
    <Route index element={<NewsPageAdmin />} />
    <Route path="create" element={<NewsCreate />} />
    <Route path="edit/:id" element={<NewsEdit />} />
  </Routes>
)

export default NewsAdminRoute
