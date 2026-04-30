import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FindProvider.css';
import { HeaderLogged } from '../components/layout/HeaderLogged';
import { Footer } from '../components/layout/Footer';
import { FilterSidebar } from '../components/find-provider/FilterSidebar';
import { ProviderList } from '../components/find-provider/ProviderList';

const pageMap: Record<string, string> = {
  'home': '/',
  'find-provider': '/find-provider',
  'provider-profile': '/provider-profile',
  'provider-dashboard': '/provider-dashboard',
  'customer-settings': '/customer/settings',
  'login': '/auth/login',
};

export const FindProvider: React.FC = () => {
  const nav = useNavigate();
  const onNavigate = (page: string, data?: any) => {
    const path = pageMap[page] || '/';
    nav(path, { state: data });
  };

  return (
    <div style={{ backgroundColor: '#f4f3ec', minHeight: '100vh' }}>
      <HeaderLogged onNavigate={onNavigate} activeNavKey="providers" />
      <main className="fp-main-container">
        <div className="fp-layout">
          <FilterSidebar />
          <ProviderList onNavigate={onNavigate} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FindProvider;
