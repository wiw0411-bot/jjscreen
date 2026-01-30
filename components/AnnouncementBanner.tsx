import React, { useEffect, useRef } from 'react';

const AnnouncementBanner: React.FC = () => {
  const videoUrl = 'https://i.imgur.com/EdGarY3.mp4';
  const videoRef = useRef<HTMLVideoElement>(null);

  // 모바일 브라우저의 자동 재생 정책에 더 강력하게 대응하기 위한 코드
  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      // play()는 Promise를 반환하며, 자동 재생이 차단되면 reject됩니다.
      // 이 코드를 통해 브라우저에게 재생 의도를 명확히 전달합니다.
      videoElement.play().catch(error => {
        // 자동 재생이 브라우저 정책(예: 저전력 모드)에 의해 막힌 경우입니다.
        // 이 경우 브라우저가 기본 재생 버튼을 보여주게 됩니다.
        console.warn("영상 자동 재생이 브라우저 정책에 의해 차단되었습니다:", error);
      });
    }
  }, []);

  return (
    <section aria-label="JJ방충망 대표 상품 안내 영상" className="lg:py-20 lg:bg-gray-100">
      <div className="container mx-auto px-0 lg:px-40">
        <video
          ref={videoRef}
          src={videoUrl}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-auto object-cover lg:rounded-xl lg:shadow-xl"
          aria-description="JJ방충망의 전문적인 시공 서비스와 대표 상품을 소개하는 동영상 배너"
        >
          브라우저가 비디오 태그를 지원하지 않습니다.
        </video>
      </div>
    </section>
  );
};

export default AnnouncementBanner;