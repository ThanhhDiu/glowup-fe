import { Navigate, Route, Routes } from 'react-router-dom'
import TechnicianLayout from '../components/layout/TechnicianLayout'
import {
  ChangePasswordPage,
  ForgotPasswordPage,
  LoginPage,
  RegisterPage,
} from '../pages/AuthScreens'
import AdminUserDetail from '../pages/AdminUserDetail'
import AdminFinancePage from '../pages/AdminFinancePage'
import AdminCategoriesPage from '../pages/AdminCategoriesPage'
import AdminUserManagement from '../pages/AdminUserManagement'
import FindProvider from '../pages/FindProvider'
import HomePage from '../pages/HomePage'
import { OrderManagementPage } from '../pages/OrderManagementPage'
import ProviderDashboard from '../pages/ProviderDashboard'
import ProviderProfile from '../pages/ProviderProfile'

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/technician">
        <Route
          path="jobs"
          element={
            <TechnicianLayout>
              <OrderManagementPage role="technician" />
            </TechnicianLayout>
          }
        />
      </Route>

      <Route path="/customer">
        {/* Customer routes will be added here. */}
      </Route>

      <Route path="/admin">
        {/* Admin routes will be added here. */}
      </Route>

      <Route path="/auth">
        <Route index element={<Navigate to="login" replace />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="change-password" element={<ChangePasswordPage />} />
      </Route>

      <Route path="/" element={<HomePage />} />
      <Route path="/find-provider" element={<FindProvider />} />
      <Route path="/provider-profile" element={<ProviderProfile />} />
      <Route path="/provider-dashboard" element={<ProviderDashboard />} />
      <Route path="/admin/users" element={<AdminUserManagement />} />
      <Route path="/admin/users/:id" element={<AdminUserDetail />} />
      <Route path="/admin/finance" element={<AdminFinancePage />} />
      <Route path="/admin/categories" element={<AdminCategoriesPage />} />
    </Routes>
  )
}