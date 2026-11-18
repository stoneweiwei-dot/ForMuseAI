import { useState } from 'react';
import { I18nProvider } from './utils/i18n';
import { calculateBazi, CITY_PRESETS } from './utils/bazi';
import { BaziResult } from './types';
import Header from './components/Header';
import SolarTermClock from './components/SolarTermClock';
import Hero from './components/Hero';
import BaziCalculator from './components/BaziCalculator';
import DailyGuidance from './components/DailyGuidance';
import FiveElementsColor from './components/FiveElementsColor';
import TenChapters from './components/TenChapters';
import KnowledgeBase from './components/KnowledgeBase';
import ReportConsultation from './components/ReportConsultation';
import Footer from './components/Footer';

export default function App() {
  const [baziResult, setBaziResult] = useState<BaziResult>(() => {
    const city = CITY_PRESETS.find(c => c.id === 'sydney') || CITY_PRESETS[0];
    return calculateBazi(1990, 6, 15, 14, 30, 'male', city, true);
  });

  return (
    <I18nProvider>
      <div className="min-h-screen bg-[#FBF9F4] text-[#1E332D] flex flex-col font-sans selection:bg-[#E2ECE8] selection:text-[#142A24]">
        {/* Top Bar */}
        <Header />

        {/* Solar Term Clock directly below Header */}
        <SolarTermClock />

        {/* Main Content Sections */}
        <main className="flex-1">
          <Hero />
          <BaziCalculator result={baziResult} onResultChange={setBaziResult} />
          <DailyGuidance />
          <FiveElementsColor baziResult={baziResult} />
          <TenChapters />
          <KnowledgeBase />
          <ReportConsultation />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </I18nProvider>
  );
}
