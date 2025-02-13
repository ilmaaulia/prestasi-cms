import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPageAdmin from './pages/admin/login'
import DashboardPageAdmin from './pages/admin/dashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/login" element={<LoginPageAdmin />} />
        <Route path="/admin/dashboard" element={<DashboardPageAdmin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
