import {Routes, Route} from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import FindProvider from './pages/FindProvider'
import ProviderProfile from './pages/ProviderProfile'
import ProviderDashboard from './pages/ProviderDashboard'
import AdminUserManagement from './pages/AdminUserManagement'
import AdminUserDetail from './pages/AdminUserDetail'
import {OrderManagementPage} from "./pages/OrderManagementPage.tsx";
import TechnicianLayout from "./components/layout/TechnicianLayout.tsx";

function App() {
    return (
        <Routes>
            {/* I. Auth Flow */}
            <Route path="/auth">
                <Route path="login" element={<div>Đăng nhập (TODO)</div>} />
                <Route path="register/technician" element={<div>Đăng ký thợ (TODO)</div>} />
                <Route path="register/customer" element={<div>Đăng ký khách (TODO)</div>} />
                <Route path="forgot-password" element={<div>Quên mật khẩu (TODO)</div>} />
            </Route>

            {/* II & III. Luồng của khách hàng (Customer Flow) */}
            <Route path="/">
                {/* Trang chủ khách */}
                <Route index element={<HomePage/>}/>
                {/* Tìm thợ chuyên nghiệp */}
                <Route path="find-provider" element={<FindProvider/>}/>
                {/* Xem chi tiết profile thợ */}
                <Route path="provider-profile" element={<ProviderProfile/>}/>
            </Route>

            <Route path="/customer">
                {/* Cài đặt tài khoản (Profile) */}
                <Route path="settings" element={<div>Cài đặt tài khoản khách (TODO)</div>} />
                {/* Quản lý đơn hàng */}
                <Route path="orders" element={
                    // <CustomerLayout>
                        <OrderManagementPage role="customer" />
                    // </CustomerLayout>
                } />
                {/* Giao diện chat của khách */}
                <Route path="chat/:id" element={<div>Khung chat khách hàng (TODO)</div>} />
            </Route>

            {/* II & IV. Luồng của thợ (Technician Flow) */}
            <Route path="/technician">
                {/* Trang tổng quan thợ */}
                <Route path="dashboard" element={<ProviderDashboard/>}/>
                {/* Hồ sơ và kỹ năng */}
                <Route path="profile" element={<div>Hồ sơ và kỹ năng thợ (TODO)</div>} />
                {/* Xác minh danh tính */}
                <Route path="kyc" element={<div>Xác minh danh tính KYC (TODO)</div>} />
                {/* Quản lý công việc */}
                <Route path="jobs" element={
                    <TechnicianLayout>
                        <OrderManagementPage role="technician" />
                    </TechnicianLayout>
                } />
                {/* Giao diện chat của thợ */}
                <Route path="chat/:id" element={<div>Khung chat thợ (TODO)</div>} />
            </Route>

            {/* Luồng của admin */}
            <Route path="/admin">
                <Route path="users" element={<AdminUserManagement/>}/>
                <Route path="users/:id" element={<AdminUserDetail/>}/>
            </Route>

        </Routes>
    )
}

export default App