import { useState } from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/landing/Hero';
import Features from './components/landing/Features';
import Footer from './components/landing/Footer';
import ProfessionalDashboard from './components/dashboard/ProfessionalDashboard';
import LoginModal from './components/auth/LoginModal';
import Pricing from './pages/Pricing';
import FeaturesPage from './pages/FeaturesPage';
import AboutPage from './pages/AboutPage';

type Page = 'home' | 'dashboard' | 'features' | 'pricing' | 'about' | 'terms' | 'privacy' | 'help' | 'contact' | 'disclaimer';

const InfoPage = ({ title, content }: { title: string, content: string }) => (
  <div className="min-h-screen bg-[#0a0a0a] text-white pt-32 pb-20 px-8 max-w-4xl mx-auto">
    <h1 className="text-4xl md:text-5xl font-black mb-8 text-white border-b border-white/10 pb-4">{title}</h1>
    <div className="text-gray-400 leading-loose whitespace-pre-line prose prose-invert max-w-none">
      {content}
    </div>
    <div className="mt-12 pt-8 border-t border-white/10">
      <p className="text-sm text-gray-500">Last updated: January 2025 | ArbElite Platform</p>
    </div>
  </div>
);

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <main>
            <Hero onOpenAuth={() => setIsAuthModalOpen(true)} />
            <Features />
            <Footer onNavigate={setCurrentPage} />
          </main>
        );
      case 'dashboard':
        return <ProfessionalDashboard isUserLoggedIn={isUserLoggedIn} onRequestLogin={() => setIsAuthModalOpen(true)} />;
      case 'features':
        return <FeaturesPage />;
      case 'pricing':
        return <Pricing />;
      case 'about':
        return <AboutPage />;
      case 'terms':
        return <InfoPage title="Terms of Service" content="1. Acceptance of Terms\n\nBy accessing and using ArbElite, you accept and agree to be bound by these terms. This platform is designed for strategic sports investors seeking mathematical arbitrage opportunities.\n\n2. User Obligations\n\nYou are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. You must be of legal age to participate in sports betting in your jurisdiction.\n\n3. Service Description\n\nArbElite provides real-time data analysis and opportunity identification software. We do not facilitate betting transactions directly. Users execute their own investment strategies through licensed bookmakers.\n\n4. Limitation of Liability\n\nArbElite provides analysis tools only. We are not responsible for financial outcomes, bookmaker account limitations, or market volatility. Past performance does not guarantee future results.\n\n5. Intellectual Property\n\nAll algorithms, methodologies, and proprietary technology remain the exclusive property of ArbElite. Reverse engineering or unauthorized redistribution is prohibited." />;
      case 'privacy':
        return <InfoPage title="Privacy Policy" content="1. Data Collection\n\nWe collect minimal data necessary for service operation: email address, usage analytics, and performance metrics. All data is encrypted at rest and in transit using industry-standard protocols.\n\n2. Data Usage\n\nYour information is used exclusively to deliver and improve our arbitrage detection services. We employ advanced anonymization techniques to protect your betting activity patterns.\n\n3. Third-Party Sharing\n\nWe never sell or share your personal information with third parties. Our infrastructure is isolated from bookmaker networks to ensure operational security.\n\n4. Data Retention\n\nAccount data is retained for the duration of your subscription plus 90 days. You may request complete data deletion at any time through your account settings.\n\n5. Security Measures\n\nWe implement bank-grade encryption (AES-256), multi-factor authentication, and regular security audits. All API connections use TLS 1.3 or higher." />;
      case 'help':
        return <InfoPage title="Help Center" content="Getting Started with ArbElite\n\n1. Platform Navigation\nThe Dashboard displays live arbitrage opportunities ranked by yield percentage. Use the filter system to select your active bookmaker accounts and preferred sports markets.\n\n2. Understanding the Data\n• Yield: Expected return on investment (ROI) for the arbitrage position\n• Liquidity: Available stake limits across all legs\n• Decay Time: Estimated window before the opportunity expires\n\n3. Bankroll Management\nClick your displayed bankroll to edit. The system uses Kelly Criterion optimization to suggest optimal stake sizes based on your configured risk tolerance.\n\n4. Stealth Mode\nOur proprietary algorithms inject randomness into bet sizing and timing to mimic recreational betting patterns, reducing the risk of bookmaker limitations.\n\n5. Support Channels\nEmail: support@arbelite.com\nResponse Time: < 2 hours during business hours\nEmergency: Priority support for Pro tier subscribers" />;
      case 'contact':
        return <InfoPage title="Contact Us" content="Get in Touch with ArbElite\n\nFor Technical Support:\nEmail: support@arbelite.com\nResponse SLA: Under 2 hours (business days)\n\nFor Partnership Inquiries:\nEmail: partners@arbelite.com\n\nFor Media & Press:\nEmail: press@arbelite.com\n\nLive Chat:\nAvailable 24/7 for all subscribers through the dashboard interface. Pro and Enterprise tiers receive priority queue placement.\n\nOffice Location:\nArbElite operates as a distributed team across multiple jurisdictions to ensure 24/7 market coverage and regulatory compliance.\n\nNote: We do not provide betting advice or recommendations. Our platform is a mathematical analysis tool for experienced investors." />;
      case 'disclaimer':
        return <InfoPage title="Disclaimer" content="Risk Disclosure Statement\n\nArbElite is a software tool designed to identify mathematical arbitrage opportunities in sports betting markets. Users must understand and accept the following:\n\n1. Financial Risk\nSports betting involves financial risk. While arbitrage betting is theoretically risk-free, practical execution carries operational risks including: account limitations, market volatility, human error, and timing delays.\n\n2. No Guarantees\nPast performance data displayed on this platform does not guarantee future results. Market conditions change continuously, and opportunity availability varies by region and bookmaker access.\n\n3. Legal Compliance\nUsers are solely responsible for ensuring their betting activities comply with local laws and regulations. ArbElite does not provide legal advice and operates as a technology provider only.\n\n4. Bookmaker Terms\nMany bookmakers prohibit arbitrage betting in their terms of service. Account limitations or closures are possible. ArbElite's stealth algorithms reduce but do not eliminate this risk.\n\n5. Independent Tool\nThis platform provides analysis only. We do not execute bets, hold funds, or act as a bookmaker. All financial transactions occur directly between the user and licensed betting operators." />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-orange-500/30">
      <Navbar onOpenAuth={() => setIsAuthModalOpen(true)} onNavigate={setCurrentPage} />
      {renderPage()}
      <LoginModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={() => {
          setIsUserLoggedIn(true);
          setIsAuthModalOpen(false);
        }}
      />
    </div>
  );
}

export default App;
