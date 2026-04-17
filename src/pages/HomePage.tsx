import React from 'react';
import { Header } from '../components/layout/Header';
import { HeroSection } from '../components/home/HeroSection';
import { PopularServices } from '../components/home/PopularServices';
import { TopExperts } from '../components/home/TopExperts';
import { PremiumBanner } from '../components/home/PremiumBanner';
import { Footer } from '../components/layout/Footer';

export const TestPage: React.FC<{ onNavigate?: (page: string) => void }> = ({ onNavigate }) => {
  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <Header onNavigate={onNavigate} />
      <main>
        <HeroSection />
        <PopularServices />
        <TopExperts onNavigate={onNavigate} />
        <PremiumBanner />
      </main>
      <Footer />
    </div>
  );
};

export default TestPage;
