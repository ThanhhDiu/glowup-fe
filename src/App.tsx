import { Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import FindProvider from './pages/FindProvider'
import ProviderProfile from './pages/ProviderProfile'
import ProviderDashboard from './pages/ProviderDashboard'
import AdminUserManagement from './pages/AdminUserManagement'
import AdminUserDetail from './pages/AdminUserDetail'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/find-provider" element={<FindProvider />} />
      <Route path="/provider-profile" element={<ProviderProfile />} />
      <Route path="/provider-dashboard" element={<ProviderDashboard />} />
      <Route path="/admin/users" element={<AdminUserManagement />} />
      <Route path="/admin/users/:id" element={<AdminUserDetail />} />
    </Routes>
  )
}

export default App