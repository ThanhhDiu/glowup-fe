import { Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import FindProvider from './pages/FindProvider'
import ProviderProfile from './pages/ProviderProfile'
import ProviderDashboard from './pages/ProviderDashboard'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/find-provider" element={<FindProvider />} />
      <Route path="/provider-profile" element={<ProviderProfile />} />
      <Route path="/provider-dashboard" element={<ProviderDashboard />} />
    </Routes>
  )
}

export default App