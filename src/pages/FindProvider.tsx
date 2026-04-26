import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './FindProvider.css';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { FilterSidebar } from '../components/find-provider/FilterSidebar';
import { ProviderList } from '../components/find-provider/ProviderList';

const pageMap: Record<string, string> = {
  'home': '/',
  'find-provider': '/find-provider',
  'provider-profile': '/provider-profile',
  'provider-dashboard': '/provider-dashboard',
};

export const FindProvider: React.FC = () => {
  const nav = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedService = searchParams.get('service') || undefined;

  const onNavigate = (page: string, data?: any) => {
    const path = pageMap[page] || '/';
    nav(path, { state: data });
  };

  return (
    <div style={{ backgroundColor: '#f4f3ec', minHeight: '100vh' }}>
      <Header onNavigate={onNavigate} />
      <main className="fp-main-container">
        <div className="fp-layout">
          <FilterSidebar />
          <ProviderList onNavigate={onNavigate} selectedService={selectedService} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FindProvider;
