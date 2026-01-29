
import React, { useState, useEffect } from 'react';
import AnnouncementBanner from './components/AnnouncementBanner';
import Hero from './components/Hero';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import KakaoChatButton from './components/KakaoChatButton';
import ContactForm from './components/ContactForm';
import EventPopup from './components/EventPopup';

const App: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const dismissedUntil = localStorage.getItem('popupDismissedUntil');
    if (dismissedUntil) {
      const dismissedTimestamp = parseInt(dismissedUntil, 10);
      if (Date.now() < dismissedTimestamp) {
        return; // Don't show popup if it's dismissed
      }
    }
    
    // Show popup after a short delay for better user experience
    const timer = setTimeout(() => {
        setIsPopupOpen(true);
    }, 1500); // 1.5 second delay

    return () => clearTimeout(timer);
  }, []);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleDismissPopupToday = () => {
    const oneDayInMs = 24 * 60 * 60 * 1000;
    const dismissalTimestamp = Date.now() + oneDayInMs;
    localStorage.setItem('popupDismissedUntil', dismissalTimestamp.toString());
    setIsPopupOpen(false);
  };

  // Placeholder image for the event popup
  const popupImageUrl = 'https://i.imgur.com/lB4tKmB.jpeg';

  return (
    <div className="bg-white text-gray-800 font-sans">
      <EventPopup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        onDismissToday={handleDismissPopupToday}
        imageUrl={popupImageUrl}
      />
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