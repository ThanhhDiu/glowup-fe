import { useState } from 'react'
import './App.css'
import HomePage from './pages/HomePage'
import FindProvider from './pages/FindProvider'

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const navigate = (page: string) => {
    setCurrentPage(page);
  };

  return (
    <>
      {currentPage === 'home' && <HomePage onNavigate={navigate} />}
      {currentPage === 'find-provider' && <FindProvider onNavigate={navigate} />}
    </>
  )
}

export default App