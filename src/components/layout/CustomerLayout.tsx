import React from 'react';
import { Footer } from './Footer';
import { HeaderLogged } from './HeaderLogged';
import { customerHeaderNavItems } from './customerNavigation';
import { useCustomerNavigate } from './useCustomerNavigate';
import './layout.css';

interface CustomerLayoutProps {
  children: React.ReactNode;
  activeNavKey?: string;
  profilePage?: string;
  searchPlaceholder?: string;
}

export const CustomerLayout: React.FC<CustomerLayoutProps> = ({
  children,
  activeNavKey = 'find-provider',
  profilePage = 'customer-settings',
  searchPlaceholder = 'Tìm kiếm dịch vụ...',
}) => {
  const onNavigate = useCustomerNavigate();

  return (
    <div className="app-wrapper cust-layout-container">
      <HeaderLogged
        onNavigate={onNavigate}
        navItems={customerHeaderNavItems}
        activeNavKey={activeNavKey}
        profilePage={profilePage}
        searchPlaceholder={searchPlaceholder}
      />

      <main className="cust-content-area">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default CustomerLayout;
