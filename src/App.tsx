import AppRouter from './router'
import { UserProfileProvider } from './contexts/UserProfileContext'
import './App.css'

export default function App() {
  return (
    <UserProfileProvider>
      <AppRouter />
    </UserProfileProvider>
  )
}