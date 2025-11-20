import Hero from '../components/landing/Hero';
import HowItWorks from '../components/landing/HowItWorks';
import Features from '../components/landing/Features';
import Comparison from '../components/landing/Comparison';
import Pricing from '../components/landing/Pricing';
import Footer from '../components/landing/Footer';

interface LandingProps {
  onStartTrial: () => void;
}

export default function Landing({ onStartTrial }: LandingProps) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Hero
        onStartTrial={onStartTrial}
        onLearnMore={() => scrollToSection('how-it-works')}
      />
      <HowItWorks />
      <Features />
      <Comparison />
      <Pricing onStartTrial={onStartTrial} />
      <Footer />
    </div>
  );
}
