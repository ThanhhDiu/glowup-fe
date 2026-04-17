import React from 'react';
import './FindProvider.css';
import { HeaderLogged } from '../components/layout/HeaderLogged';
import { Footer } from '../components/layout/Footer';
import { FilterSidebar } from '../components/find-provider/FilterSidebar';
import { ProviderList } from '../components/find-provider/ProviderList';

export const FindProvider: React.FC<{ onNavigate?: (page: string) => void }> = ({ onNavigate }) => {
    return (
        <div style={{ backgroundColor: '#f4f3ec', minHeight: '100vh' }}>
            <HeaderLogged onNavigate={onNavigate} />
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
