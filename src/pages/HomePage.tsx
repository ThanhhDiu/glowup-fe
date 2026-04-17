import React from 'react';
import { Header } from '../components/layout/Header';
import { HeroSection } from '../components/home/HeroSection';
import { PopularServices } from '../components/home/PopularServices';
import { TopExperts } from '../components/home/TopExperts';
import { PremiumBanner } from '../components/home/PremiumBanner';
import { Footer } from '../components/layout/Footer';

export const TestPage: React.FC = () => {
  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      <Header />
      <main>
        <HeroSection />
        <PopularServices />
        <TopExperts />
        <PremiumBanner />
      </main>
      <Footer />
    </div>
  );
};

export default TestPage;
