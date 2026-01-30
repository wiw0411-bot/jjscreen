import React from 'react';

const AnnouncementBanner: React.FC = () => {
  const videoUrl = 'https://i.imgur.com/EdGarY3.mp4';

  return (
    <section aria-label="JJ방충망 대표 상품 안내 영상">
      <video
        src={videoUrl}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-auto object-cover"
        aria-description="JJ방충망의 전문적인 시공 서비스와 대표 상품을 소개하는 동영상 배너"
      >
        브라우저가 비디오 태그를 지원하지 않습니다.
      </video>
    </section>
  );
};

export default AnnouncementBanner;