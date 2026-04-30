import { Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import FindProvider from './pages/FindProvider'
import ProviderProfile from './pages/ProviderProfile'
import ProviderDashboard from './pages/ProviderDashboard'
import AdminUserManagement from './pages/AdminUserManagement'
import AdminUserDetail from './pages/AdminUserDetail'
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
            <Route path="/" element={<HomePage/>}/>
            <Route path="/find-provider" element={<FindProvider/>}/>
            <Route path="/provider-profile" element={<ProviderProfile/>}/>
            <Route path="/provider-dashboard" element={<ProviderDashboard/>}/>
            <Route path="/admin/users" element={<AdminUserManagement/>}/>
            <Route path="/admin/users/:id" element={<AdminUserDetail/>}/>
            <Route path="/admin/finance" element={<AdminFinancePage/>}/>
            <Route path="/admin/categories" element={<AdminCategoriesPage/>}/>
            <Route path="/" element={<HomePage />} />
            <Route path="/find-provider" element={<FindProvider />} />
            <Route path="/provider-profile" element={<ProviderProfile />} />
            <Route path="/provider-dashboard" element={<ProviderDashboard />} />
            <Route path="/admin/users" element={<AdminUserManagement />} />
            <Route path="/admin/users/:id" element={<AdminUserDetail />} />

        </Routes>
    )
}

export default App