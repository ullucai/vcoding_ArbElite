import { useState } from 'react';
import { Route, Switch, useLocation } from 'wouter';
import Navbar from './components/layout/Navbar';
import Hero from './components/landing/Hero';
import Features from './components/landing/Features';
import Footer from './components/landing/Footer';
import DashboardContainer from './pages/DashboardContainer';
import LoginModal from './components/auth/LoginModal';
import Pricing from './pages/Pricing';
import FeaturesPage from './pages/FeaturesPage';
import AboutPage from './pages/AboutPage';
import Terms from './pages/legal/Terms';
import Privacy from './pages/legal/Privacy';
import Disclaimer from './pages/legal/Disclaimer';
import Help from './pages/Help';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

type UserTier = 'free' | 'pro' | 'admin';

function HomePage({ onOpenAuth, onNavigate, isUserLoggedIn, userTier }: { onOpenAuth: () => void; onNavigate: (page: string) => void; isUserLoggedIn: boolean; userTier: UserTier }) {
  return (
    <main>
      <Hero onOpenAuth={onOpenAuth} isUserLoggedIn={isUserLoggedIn} userTier={userTier} />
      <Features />
      <Footer onNavigate={onNavigate} />
    </main>
  );
}

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userTier, setUserTier] = useState<UserTier>('free');
  const [username, setUsername] = useState('');
  const [location, navigate] = useLocation();

  const handleNavigate = (page: string) => {
    const pageMap: Record<string, string> = {
      'home': '/',
      'dashboard': '/dashboard',
      'features': '/features',
      'pricing': '/pricing',
      'about': '/about',
      'terms': '/terms',
      'privacy': '/privacy',
      'help': '/help',
      'contact': '/contact',
      'disclaimer': '/disclaimer'
    };
    navigate(pageMap[page] || '/');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-orange-500/30">
      <Switch>
        <Route path="/">
          {() => (
            <>
              <Navbar onOpenAuth={() => setIsAuthModalOpen(true)} onNavigate={handleNavigate} />
              <HomePage onOpenAuth={() => setIsAuthModalOpen(true)} onNavigate={handleNavigate} isUserLoggedIn={isUserLoggedIn} userTier={userTier} />
            </>
          )}
        </Route>

        <Route path="/dashboard">
          {() => {
            if (!isUserLoggedIn) {
              setTimeout(() => setIsAuthModalOpen(true), 0);
              navigate('/');
              return null;
            }
            return (
              <DashboardContainer
                userTier={userTier}
                onLogout={() => {
                  setIsUserLoggedIn(false);
                  setUserTier('free');
                  setUsername('');
                  navigate('/');
                }}
              />
            );
          }}
        </Route>

        <Route path="/features">
          {() => (
            <>
              <Navbar onOpenAuth={() => setIsAuthModalOpen(true)} onNavigate={handleNavigate} />
              <FeaturesPage />
            </>
          )}
        </Route>

        <Route path="/pricing">
          {() => (
            <>
              <Navbar onOpenAuth={() => setIsAuthModalOpen(true)} onNavigate={handleNavigate} />
              <Pricing />
            </>
          )}
        </Route>

        <Route path="/about">
          {() => (
            <>
              <Navbar onOpenAuth={() => setIsAuthModalOpen(true)} onNavigate={handleNavigate} />
              <AboutPage />
            </>
          )}
        </Route>

        <Route path="/terms">
          {() => <Terms onNavigate={handleNavigate} />}
        </Route>

        <Route path="/privacy">
          {() => <Privacy onNavigate={handleNavigate} />}
        </Route>

        <Route path="/help">
          {() => <Help onNavigate={handleNavigate} />}
        </Route>

        <Route path="/disclaimer">
          {() => <Disclaimer onNavigate={handleNavigate} />}
        </Route>

        <Route path="/contact">
          {() => <Contact onNavigate={handleNavigate} />}
        </Route>

        <Route>{() => <NotFound />}</Route>
      </Switch>

      <LoginModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(tier, user) => {
          setIsUserLoggedIn(true);
          setUserTier(tier);
          setUsername(user);
          setIsAuthModalOpen(false);
          navigate('/dashboard');
        }}
      />
    </div>
  );
}

export default App;
