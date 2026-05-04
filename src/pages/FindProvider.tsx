import React from 'react';
import './FindProvider.css';
import { useCustomerNavigate } from '../components/layout/useCustomerNavigate';
import { FilterSidebar } from '../components/find-provider/FilterSidebar';
import { ProviderList } from '../components/find-provider/ProviderList';

export const FindProvider: React.FC = () => {
  const onNavigate = useCustomerNavigate();

  return (
    <div style={{ backgroundColor: '#f4f3ec', minHeight: '100vh' }}>
      <main className="fp-main-container">
        <div className="fp-layout">
          <FilterSidebar />
          <ProviderList onNavigate={onNavigate} />
        </div>
      </main>
    </div>
  );
};

export default FindProvider;
