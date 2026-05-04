import { Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import Provider from './pages/Provider.tsx'
import ServicesPage from './pages/ServicesPage'
import ProviderProfile from './pages/ProviderProfile'
import ProviderDashboard from './pages/ProviderDashboard'
import AdminUserManagement from './pages/AdminUserManagement'
import AdminUserDetail from './pages/AdminUserDetail'
import AdminDashboard from './pages/AdminDashboard'
import AdminVerificationRequests from './pages/AdminVerificationRequests'
import AdminVerificationDetail from './pages/AdminVerificationDetail'
import AdminVerificationUpdate from './pages/AdminVerificationUpdate'
import AdminFinancePage from './pages/AdminFinancePage'
import AdminCategoriesPage from './pages/AdminCategoriesPage'
import {OrderManagementPage} from "./pages/OrderManagementPage.tsx";
import TechnicianLayout from "./components/layout/TechnicianLayout.tsx";
import TechnicianWalletPage from './pages/TechnicianWalletPage'
import TechnicianWalletTopUpPage from './pages/TechnicianWalletTopUpPage'
import TechnicianWalletWithdrawPage from './pages/TechnicianWalletWithdrawPage'
import { ChatPage } from './pages/ChatPage';


function App() {
    return (
        <Routes>
            {/*  Luồng của thợ*/}
            <Route path="/technician">
                <Route path="jobs" element={
                    <TechnicianLayout activeItem="jobs">
                        <OrderManagementPage role="technician" />
                    </TechnicianLayout>
                } />
                <Route path="wallet" element={
                    <TechnicianLayout activeItem="wallet">
                        <TechnicianWalletPage />
                    </TechnicianLayout>
                } />
                <Route path="wallet/topup" element={
                    <TechnicianLayout activeItem="wallet">
                        <TechnicianWalletTopUpPage />
                    </TechnicianLayout>
                } />
                <Route path="wallet/withdraw" element={
                    <TechnicianLayout activeItem="wallet">
                        <TechnicianWalletWithdrawPage />
                    </TechnicianLayout>
                } />

                {/*<Route path="/chat" element={<ChatPage role="provider" />} />*/}
            </Route>

            {/*  Luồng của khách hàng*/}
            <Route path="/customer">
                {/*<Route path="orders" element={*/}
                {/*    <CustomerLayout>*/}

                {/*        <OrderManagementPage role="customer" />*/}
                {/*    </CustomerLayout>*/}
                {/*} />*/}
                <Route path="chat" element={<ChatPage />} />
            </Route>


            {/*  Luồng của admin*/}
            <Route path="/admin">

            </Route>

            {/*đem mấy này phân theo luồng*/}
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/provider" element={<Provider />} />
            <Route path="/provider-profile" element={<ProviderProfile />} />
            <Route path="/provider-dashboard" element={<ProviderDashboard />} />
            <Route path="/admin/users" element={<AdminUserManagement />} />
            <Route path="/admin/users/:id" element={<AdminUserDetail />} />
            <Route path="/admin/finance" element={<AdminFinancePage />} />
            <Route path="/admin/categories" element={<AdminCategoriesPage />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/verification" element={<AdminVerificationRequests />} />
            <Route path="/admin/verification/:requestId/update" element={<AdminVerificationUpdate />} />
            <Route path="/admin/verification/:requestId" element={<AdminVerificationDetail />} />

        </Routes>
    )
}

export default App;