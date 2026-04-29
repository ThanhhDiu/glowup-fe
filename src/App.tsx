import { Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import FindProvider from './pages/FindProvider'
import ProviderProfile from './pages/ProviderProfile'
import ProviderDashboard from './pages/ProviderDashboard'
import AdminUserManagement from './pages/AdminUserManagement'
import AdminUserDetail from './pages/AdminUserDetail'
import AdminDashboard from './pages/AdminDashboard'
import AdminVerificationRequests from './pages/AdminVerificationRequests'
import AdminVerificationDetail from './pages/AdminVerificationDetail'
import AdminVerificationUpdate from './pages/AdminVerificationUpdate'
import { OrderManagementPage } from "./pages/OrderManagementPage.tsx";
import TechnicianLayout from "./components/layout/TechnicianLayout.tsx";
import { ChatPage } from './pages/ChatPage';

function App() {
    return (
        <Routes>
            {/*  Luồng của thợ*/}
            <Route path="/technician">
                <Route path="jobs" element={
                    <TechnicianLayout>
                        <OrderManagementPage role="technician" />
                    </TechnicianLayout>
                } />
                <Route path="messages" element={<ChatPage />} />
            </Route>

            {/*  Luồng của khách hàng*/}
            <Route path="/customer">
                {/*<Route path="orders" element={*/}
                {/*    <CustomerLayout>*/}

                {/*        <OrderManagementPage role="customer" />*/}
                {/*    </CustomerLayout>*/}
                {/*} />*/}
                <Route path="messages" element={<ChatPage />} />
            </Route>


            {/*  Luồng của admin*/}
            <Route path="/admin">

            </Route>

            {/*đem mấy này phân theo luồng*/}
            <Route path="/" element={<HomePage />} />
            <Route path="/find-provider" element={<FindProvider />} />
            <Route path="/provider-profile" element={<ProviderProfile />} />
            <Route path="/provider-dashboard" element={<ProviderDashboard />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUserManagement />} />
            <Route path="/admin/users/:id" element={<AdminUserDetail />} />
            <Route path="/admin/verification" element={<AdminVerificationRequests />} />
            <Route path="/admin/verification/:requestId/update" element={<AdminVerificationUpdate />} />
            <Route path="/admin/verification/:requestId" element={<AdminVerificationDetail />} />

        </Routes>
    )
}

export default App