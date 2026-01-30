import React, { useState } from 'react';
import PriceCalculatorModal from './PriceCalculatorModal';

interface Product {
  title: string;
  features: string[];
  price: string;
  imageUrl: string;
  modalImageUrl: string;
  alt: string;
}

interface ProductCardProps extends Product {
  onCheckPrice: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ onCheckPrice, ...product }) => {
  const { title, features, price, imageUrl, alt } = product;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transform hover:shadow-xl transition-shadow duration-300">
      <div className="w-full aspect-square bg-gray-100">
        <img src={imageUrl} alt={alt} className="w-full h-full object-cover" />
      </div>
      <div className="p-3 sm:p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 break-keep">{title}</h3>
          <ul className="text-xs text-gray-600 mt-2 space-y-1">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start min-h-10">
                <i className="fas fa-check text-blue-500 mr-2 mt-1 flex-shrink-0"></i>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
            <p className="text-base sm:text-lg font-bold text-gray-800 text-right mb-3">{parseInt(price).toLocaleString('ko-KR')}원~</p>
            <button onClick={() => onCheckPrice(product)} className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 text-sm sm:text-base">
                가격확인
            </button>
        </div>
      </div>
    </div>
  );
};

const Hero: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleOpenModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const products: Product[] = [
    {
      title: '촘촘 미세방충망',
      features: ['날벌레 90%차단', '깨끗하게 선명한 시야 확보', '반영구적 사용 가능한 내구성'],
      price: '15000',
      imageUrl: 'https://i.imgur.com/RJcHCVn.jpeg',
      modalImageUrl: 'https://i.imgur.com/nJKYDKx.png',
      alt: '촘촘 미세방충망 제품 이미지'
    },
    {
      title: '블랙 스텐방충망',
      features: ['녹과 부식에 강한 스테인리스', '반려동물이 있는 가정에 적합', '반영구적 사용 가능한 내구성'],
      price: '25000',
      imageUrl: 'https://i.imgur.com/bmJroTk.jpeg',
      modalImageUrl: 'https://i.imgur.com/ZnKULw7.png',
      alt: '블랙 스텐방충망 제품 이미지'
    }
  ];

  return (
    <>
      <section id="products" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-12 max-w-3xl mx-auto border border-gray-200">
            <div className="text-center">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">대표 상품 및 가격 안내</h1>
                <div className="text-base text-gray-600 mt-4 max-w-2xl mx-auto break-keep">
                    <p>가장 많이 찾으시는 방충망을 합리적인 가격에 만나보세요.</p>
                    <p className="mt-1">투명한 가격과 정직한 시공을 약속합니다.</p>
                </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-8 max-w-4xl mx-auto">
            {products.map((product, index) => (
              <ProductCard key={index} {...product} onCheckPrice={handleOpenModal} />
            ))}
          </div>
        </div>
      </section>
      <PriceCalculatorModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        product={selectedProduct}
      />
    </>
  );
};

export default Hero;