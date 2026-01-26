
import React from 'react';

const KakaoChatButton: React.FC = () => {
  // TODO: 사장님의 카카오톡 채널 채팅 URL로 변경해주세요.
  // 카카오톡 채널 관리자 센터에서 확인하실 수 있습니다. (예: https://pf.kakao.com/_.../chat)
  const kakaoChatUrl = 'https://open.kakao.com/o/sOZPHedi';

  return (
    <a
      href={kakaoChatUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="카카오톡으로 실시간 상담하기"
      className="fixed bottom-6 right-6 bg-[#FEE500] w-16 h-16 rounded-full shadow-lg flex items-center justify-center z-40 hover:bg-yellow-400 transition-all transform hover:scale-110"
    >
      {/* Replaced Font Awesome icon with an inline SVG for reliability */}
      <svg
        className="w-8 h-8"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24">
        <path 
          fill="#3C1E1E" 
          d="M12 2C6.486 2 2 5.589 2 10c0 2.908 1.898 5.515 4.673 6.912-.343.988-.737 2.13-1.018 2.94-.092.267.12.548.4.548.163 0 .322-.05.452-.143a10.03 10.03 0 0 0 4.21-2.433C11.23 17.939 11.61 18 12 18c5.514 0 10-3.589 10-8s-4.486-8-10-8z"
        />
      </svg>
    </a>
  );
};

export default KakaoChatButton;
