import { useState } from 'react'
import './App.css'
import HomePage from './pages/HomePage'
import FindProvider from './pages/FindProvider'
import ProviderProfile from './pages/ProviderProfile'

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [providerData, setProviderData] = useState<any>(null);

  const navigate = (page: string, data?: any) => {
    setCurrentPage(page);
    if (data) setProviderData(data);
  };

  return (
    <>
      {currentPage === 'home' && <HomePage onNavigate={navigate} />}
      {currentPage === 'find-provider' && <FindProvider onNavigate={navigate} />}
      {currentPage === 'provider-profile' && <ProviderProfile onNavigate={navigate} providerData={providerData} />}
    </>
  )
}

export default App