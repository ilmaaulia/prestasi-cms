import { Route, Routes } from 'react-router-dom'
import NewsAdmin from '../pages/admin/news'
import NewsCreate from '../pages/admin/news/create'
import NewsEdit from '../pages/admin/news/edit'

const NewsRoute = () => (
  <Routes>
    <Route index element={<NewsAdmin />} />
    <Route path="create" element={<NewsCreate />} />
    <Route path="edit/:id" element={<NewsEdit />} />
  </Routes>
)

export default NewsRoute
