import React from 'react';

const AnnouncementBanner: React.FC = () => {
  const pcImageUrl = 'https://i.imgur.com/ljEN0Tc.png';
  const mobileImageUrl = 'https://i.imgur.com/hq2zBFZ.png';

  return (
    <section aria-label="JJ방충망 대표 상품 안내">
      <picture>
        {/* Show PC image on screens 768px and wider */}
        <source media="(min-width: 768px)" srcSet={pcImageUrl} />
        {/* Fallback to mobile image */}
        <img 
          src={mobileImageUrl} 
          alt="JJ방충망의 전문적인 시공 서비스와 대표 상품 안내 배너" 
          className="w-full h-auto object-cover" 
        />
      </picture>
    </section>
  );
};

export default AnnouncementBanner;