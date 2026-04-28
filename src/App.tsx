import './App.css'
<<<<<<< HEAD
import HomePage from './pages/HomePage'
import FindProvider from './pages/FindProvider'
import ProviderProfile from './pages/ProviderProfile'
import ProviderDashboard from './pages/ProviderDashboard'
import AdminUserManagement from './pages/AdminUserManagement'
import AdminUserDetail from './pages/AdminUserDetail'
import {OrderManagementPage} from "./pages/OrderManagementPage.tsx";
import TechnicianLayout from "./components/layout/TechnicianLayout.tsx";
import TechnicianWalletPage from './pages/TechnicianWalletPage'

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
            </Route>
            {/*  Luồng của khách hàng*/}
            <Route path="/customer">
                {/*<Route path="orders" element={*/}
                {/*    <CustomerLayout>*/}

                {/*        <OrderManagementPage role="customer" />*/}
                {/*    </CustomerLayout>*/}
                {/*} />*/}
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

        </Routes>
    )
=======
import AppRouter from './router'

function App() {
  return <AppRouter />
>>>>>>> e1dec1290681da817acaf7dc63f0de0f9201c46a
}

export default App