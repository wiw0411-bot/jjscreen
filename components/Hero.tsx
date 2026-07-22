import React from 'react';

// App 컴포넌트와 타입을 일치시킵니다.
interface Product {
  title: string;
  price: string;
  imageUrl: string;
  modalImageUrl: string;
  alt: string;
}

interface HeroProps {
  onOpenModal: (product: Product) => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenModal }) => {
  const fineMeshFeatures = [
    '날벌레 90% 차단',
    '깨끗하게 선명한 시야 확보',
    '반영구적 사용 가능한 내구성',
  ];

  const blackSteelFeatures = [
    '녹과 부식에 강한 스테인리스',
    '반려동물이 있는 가정에 적합',
    '반영구적 사용 가능한 내구성',
  ];

  // 모달에 전달할 상품 데이터입니다. title은 PriceCalculatorModal의 priceMaps 키와 일치해야 합니다.
  const fineMeshProduct: Product = {
    title: '미세 촘촘방충망',
    modalImageUrl: 'https://i.imgur.com/QxOtj3f.png',
    alt: '미세촘촘방충망',
    price: '', 
    imageUrl: ''
  };

  const blackSteelProduct: Product = {
    title: '블랙 스텐방충망',
    modalImageUrl: 'https://i.imgur.com/QxOtj3f.png',
    alt: '블랙스텐방충망',
    price: '',
    imageUrl: ''
  };

  return (
    <section className="pt-8 sm:pt-16 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6">
        <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6 sm:mb-12">
          <span className="animate-text-shimmer">JJ방충망</span>
          <br />
          <span className="animate-text-shimmer">실시간 견적 받기</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {/* Column 1: 미세촘촘방충망 */}
          <div className="flex flex-col items-center">
            <div className="relative mb-[-14px] sm:mb-[-16px] z-10 animate-subtle-bounce">
              <div className="bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1 sm:py-2 rounded-full shadow-md">
                가성비 끝판왕
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-emerald-400 shadow-lg p-5 sm:p-8 flex flex-col w-full h-full justify-between">
              <div>
                <div className="flex flex-col items-center text-center pt-4 sm:pt-8">
                  <img src="https://i.imgur.com/jfGCSmh.png" alt="미세 촘촘방충망 아이콘" className="w-12 h-12 sm:w-16 sm:h-16 mb-2 sm:mb-4" />
                  <h2 className="text-lg sm:text-2xl font-bold text-gray-800">미세 촘촘방충망</h2>
                </div>
                <ul className="space-y-2 sm:space-y-3 mt-3 sm:mt-4 text-gray-600">
                  {fineMeshFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center text-xs sm:text-base">
                      <i className="fas fa-check text-blue-500 mr-2 sm:mr-3 text-xs sm:text-base"></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button 
                onClick={() => onOpenModal(fineMeshProduct)}
                className="w-1/2 mx-auto mt-4 sm:mt-6 bg-emerald-500 text-white font-bold py-2.5 sm:py-3 rounded-lg hover:bg-emerald-600 transition-all duration-300 text-xs sm:text-lg transform hover:scale-105 animate-pulse-emerald"
              >
                실시간 견적
              </button>
            </div>
          </div>

          {/* Column 2: 블랙스텐방충망 */}
          <div className="flex flex-col items-center">
            <div className="relative mb-[-14px] sm:mb-[-16px] z-10 animate-subtle-bounce">
                <div className="bg-sky-400 text-white text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1 sm:py-2 rounded-full shadow-md">
                    트렌드 상품
                </div>
            </div>
            <div className="bg-white rounded-2xl border border-sky-400 shadow-lg p-5 sm:p-8 flex flex-col justify-between w-full h-full">
              <div>
                <div className="flex flex-col items-center text-center pt-4 sm:pt-8">
                  <img src="https://i.imgur.com/M0JHz2T.png" alt="블랙 스텐방충망 아이콘" className="w-12 h-12 sm:w-16 sm:h-16 mb-2 sm:mb-4" />
                  <h2 className="text-lg sm:text-2xl font-bold text-gray-800">블랙 스텐방충망</h2>
                </div>
                <ul className="space-y-2 sm:space-y-3 mt-3 sm:mt-4 text-gray-600">
                  {blackSteelFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center text-xs sm:text-base">
                      <i className="fas fa-check text-blue-500 mr-2 sm:mr-3 text-xs sm:text-base"></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button 
                onClick={() => onOpenModal(blackSteelProduct)}
                className="w-1/2 mx-auto mt-4 sm:mt-6 bg-sky-500 text-white font-bold py-2.5 sm:py-3 rounded-lg hover:bg-sky-600 transition-all duration-300 text-xs sm:text-lg transform hover:scale-105 animate-pulse-sky"
              >
                실시간 견적
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;