
import React from 'react';
import AnnouncementBanner from './components/AnnouncementBanner';
import Hero from './components/Hero';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import KakaoChatButton from './components/KakaoChatButton';
import ContactForm from './components/ContactForm';

const App: React.FC = () => {
  return (
    <div className="bg-white text-gray-800 font-sans">
      <AnnouncementBanner />
      <main>
        <Hero />
        <Features />
        <Testimonials />
        <FAQ />
        <ContactForm />
      </main>
      <KakaoChatButton />
      <Footer />
    </div>
  );
};

export default App;
