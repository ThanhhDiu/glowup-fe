import { Navigate, Route, Routes } from 'react-router-dom'
import TechnicianLayout from '../components/layout/TechnicianLayout'
import {
  ChangePasswordPage,
  ForgotPasswordPage,
  LoginPage,
  RegisterPage,
} from '../pages/AuthScreens'
import AdminSystemSettingsPage from '../pages/AdminSystemSettingsPage'
import AdminUserDetail from '../pages/AdminUserDetail'
import AdminFinancePage from '../pages/AdminFinancePage'
import AdminCategoriesPage from '../pages/AdminCategoriesPage'
import AdminUserManagement from '../pages/AdminUserManagement'
<<<<<<< HEAD
import AdminDashboard from '../pages/AdminDashboard'
import Provider from '../pages/Provider'
=======
import CustomerAccountSettingsPage from '../pages/CustomerAccountSettingsPage'
import AdminDashboard from '../pages/AdminDashboard'
import FindProvider from '../pages/FindProvider'
>>>>>>> ca5611de0fe4df39bf68124d2dcff80db0599821
import HomePage from '../pages/HomePage'
import { OrderManagementPage } from '../pages/OrderManagementPage'
import ProviderDashboard from '../pages/ProviderDashboard'
import ProviderProfile from '../pages/ProviderProfile'
<<<<<<< HEAD
import ServicesPage from '../pages/ServicesPage'
=======
import TechnicianProfileSettingsPage from '../pages/TechnicianProfileSettingsPage'
>>>>>>> ca5611de0fe4df39bf68124d2dcff80db0599821

export default function AppRouter() {
  return (
    <Routes>
<<<<<<< HEAD
      {/* Trang chủ */}
=======
      <Route path="/technician">
        <Route
          path="jobs"
          element={
            <TechnicianLayout activeItem="jobs">
              <OrderManagementPage role="technician" />
            </TechnicianLayout>
          }
        />
        <Route
          path="profile"
          element={
            <TechnicianLayout activeItem="profile">
              <TechnicianProfileSettingsPage />
            </TechnicianLayout>
          }
        />
      </Route>

      <Route path="/customer">
        <Route path="settings" element={<CustomerAccountSettingsPage />} />
      </Route>

      <Route path="/admin">
        <Route path="settings" element={<AdminSystemSettingsPage />} />
      </Route>

      <Route path="/auth">
        <Route index element={<Navigate to="login" replace />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="change-password" element={<ChangePasswordPage />} />
      </Route>

>>>>>>> ca5611de0fe4df39bf68124d2dcff80db0599821
      <Route path="/" element={<HomePage />} />
      <Route path="/provider" element={<Provider />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/provider-profile" element={<ProviderProfile />} />

      {/* Technician routes */}
      <Route path="/technician/jobs" element={
        <TechnicianLayout>
          <OrderManagementPage role="technician" />
        </TechnicianLayout>
      } />
      <Route path="/provider-dashboard" element={<ProviderDashboard />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/users" element={<AdminUserManagement />} />
      <Route path="/admin/users/:id" element={<AdminUserDetail />} />
<<<<<<< HEAD

      {/* Auth routes */}
      <Route path="/auth" element={<Navigate to="/auth/login" replace />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/auth/change-password" element={<ChangePasswordPage />} />

      {/* Admin routes continued */}
      <Route path="/admin/finance" element={<AdminFinancePage />} />
      <Route path="/admin/categories" element={<AdminCategoriesPage />} />

      {/* Catch-all redirect - PHẢI ở cuối cùng */}
      <Route path="*" element={<Navigate to="/" replace />} />
=======
      <Route path="/admin/finance" element={<AdminFinancePage />} />
      <Route path="/admin/categories" element={<AdminCategoriesPage />} />
>>>>>>> ca5611de0fe4df39bf68124d2dcff80db0599821
    </Routes>
  )
}
