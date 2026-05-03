import { Navigate, Route, Routes } from 'react-router-dom'
import TechnicianLayout from '../components/layout/TechnicianLayout'
import {
  ChangePasswordPage,
  ForgotPasswordPage,
  LoginPage,
  RegisterPage,
} from '../pages/AuthScreens'
import AdminUserDetail from '../pages/AdminUserDetail'
import AdminUserManagement from '../pages/AdminUserManagement'
import FindProvider from '../pages/FindProvider'
import HomePage from '../pages/HomePage'
import { OrderManagementPage } from '../pages/OrderManagementPage'
import ProviderDashboard from '../pages/ProviderDashboard'
import ProviderProfile from '../pages/ProviderProfile'

export default function AppRouter() {
  return (
    <Routes>
      {/* Trang chủ */}
      <Route path="/" element={<HomePage />} />
      <Route path="/find-provider" element={<FindProvider />} />
      <Route path="/provider-profile" element={<ProviderProfile />} />

      {/* Technician routes */}
      <Route path="/technician/jobs" element={
        <TechnicianLayout>
          <OrderManagementPage role="technician" />
        </TechnicianLayout>
      } />
      <Route path="/provider-dashboard" element={<ProviderDashboard />} />

      {/* Customer routes */}
      <Route path="/customer/orders" element={
        <OrderManagementPage role="customer" />
      } />

      {/* Admin routes */}
      <Route path="/admin/users" element={<AdminUserManagement />} />
      <Route path="/admin/users/:id" element={<AdminUserDetail />} />

      {/* Auth routes */}
      <Route path="/auth" element={<Navigate to="/auth/login" replace />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/auth/change-password" element={<ChangePasswordPage />} />

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}