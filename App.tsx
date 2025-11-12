import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Videos from './components/Videos';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import { PortfolioProvider } from './context/PortfolioContext';

const AppContent: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  useEffect(() => {
    // Spotlight effect
    const handleMouseMove = (e: MouseEvent) => {
      document.body.style.setProperty('--x', `${e.clientX}px`);
      document.body.style.setProperty('--y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Admin mode check
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') {
      setIsAdmin(true);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen font-sans" style={{ position: 'relative', width: '100vw', minHeight: '100vh', overflow: 'hidden' }}>
      <Header />
      <Hero />
      <main className="container mx-auto px-6 md:px-12" style={{ position: 'relative', zIndex: 1 }}>
        <About />
        <Skills />
        <Projects />
        <Videos />
        <Experience />
        <Contact />
      </main>
      <Footer />
      {isAdmin && (
        <>
          <button
            onClick={() => setShowAdminPanel(true)}
            className="fixed bottom-4 right-4 bg-cyan-500 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-cyan-600 transition-transform hover:scale-105 z-50"
          >
            Edit Content
          </button>
          <AdminPanel
            isOpen={showAdminPanel}
            onClose={() => setShowAdminPanel(false)}
          />
        </>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <PortfolioProvider>
      <AppContent />
    </PortfolioProvider>
  );
};

export default App;
