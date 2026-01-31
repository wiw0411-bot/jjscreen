import React, { useState } from 'react';
import SlidingBanner from './components/AnnouncementBanner';
import Hero from './components/Hero';
import Highlights from './components/Highlights';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import KakaoChatButton from './components/KakaoChatButton';
import PriceCalculatorModal from './components/PriceCalculatorModal';

// PriceCalculatorModal에 전달할 상품 정보의 타입을 정의합니다.
interface Product {
  title: string;
  price: string;
  imageUrl: string;
  modalImageUrl: string;
  alt: string;
}

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleOpenModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null); // 모달이 닫힐 때 선택된 상품 정보도 초기화합니다.
  };

  return (
    <div className="bg-gray-100 text-gray-800 font-sans">
      <SlidingBanner />
      <main>
        <Hero onOpenModal={handleOpenModal} />
        <Highlights />
        <Testimonials />
        <FAQ />
        <ContactForm />
      </main>
      <KakaoChatButton />
      <Footer />
      <PriceCalculatorModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        product={selectedProduct}
      />
    </div>
  );
};

export default App;