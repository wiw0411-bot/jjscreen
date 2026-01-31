import React, { useState, useEffect } from 'react';

// 데스크톱용 배너 이미지
const desktopBannerImages = [
  'https://i.imgur.com/7YYqsAe.jpeg',
  'https://i.imgur.com/wGBmXCL.jpeg',
  'https://i.imgur.com/TOXF1UJ.jpeg',
];

// 모바일용 배너 이미지
const mobileBannerImages = [
  'https://i.imgur.com/twgL7Qg.jpeg',
  'https://i.imgur.com/mo0ewWR.jpeg',
  'https://i.imgur.com/Q9rr2Dc.jpeg',
];

// 화면 너비를 감지하여 모바일 여부를 반환하는 커스텀 훅
const useIsMobile = (breakpoint = 768) => {
    const isClient = typeof window === 'object';
    const [isMobile, setIsMobile] = useState(isClient ? window.innerWidth < breakpoint : false);

    useEffect(() => {
        if (!isClient) {
            return;
        }
        const handleResize = () => {
            setIsMobile(window.innerWidth < breakpoint);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [breakpoint, isClient]);

    return isMobile;
};

const SlidingBanner: React.FC = () => {
  const isMobile = useIsMobile();
  const bannerImages = isMobile ? mobileBannerImages : desktopBannerImages;
  
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // 화면 크기 변경으로 이미지 목록이 바뀔 때 인덱스 초기화
  useEffect(() => {
    setCurrentIndex(0);
  }, [isMobile]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 4000); // 4초마다 배너 변경

    return () => clearInterval(timer);
  }, [bannerImages.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + bannerImages.length) % bannerImages.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
  };

  return (
    <section aria-label="주요 서비스 안내" className="relative w-full bg-gray-200 overflow-hidden">
      <div className="overflow-hidden relative h-24 sm:h-36 md:h-44">
        <div 
          className="flex absolute top-0 left-0 w-full h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {bannerImages.map((src, index) => (
            <div key={index} className="w-full flex-shrink-0 h-full overflow-hidden">
              <img 
                src={src} 
                alt={`JJ방충망 프로모션 배너 ${index + 1}`} 
                className="w-full h-full object-cover transform scale-105" 
              />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={goToPrevious}
        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
        aria-label="이전 배너 보기"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={goToNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
        aria-label="다음 배너 보기"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {bannerImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`배너 ${index + 1}로 이동`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default SlidingBanner;