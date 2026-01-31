import React from 'react';

const ContactForm: React.FC = () => {
  // 카카오톡 상담 URL (KakaoChatButton.tsx와 동일하게 유지)
  const kakaoChatUrl = 'https://open.kakao.com/o/sOZPHedi';
  const businessPhoneNumber = '010-2846-9820';

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="lg:w-1/2 lg:pr-12 mb-12 lg:mb-0">
            <h2 className="text-xl md:text-3xl font-bold">지금 바로 상담하세요</h2>
            <p className="text-sm md:text-base text-gray-600 mt-4 mb-6">
              궁금한 점이 있으신가요? 전화 또는 카카오톡으로 문의주시면{' '}
              <br className="hidden sm:block" />
              신속하고 친절하게 상담해드리겠습니다.
            </p>
            <div className="space-y-4 text-base">
              <p className="flex items-center">
                <i className="fas fa-phone-alt text-blue-600 mr-4"></i>
                <a href={`tel:${businessPhoneNumber}`} className="text-gray-800 hover:text-blue-600">{businessPhoneNumber}</a>
              </p>
              <p className="flex items-center">
                <i className="fas fa-map-marker-alt text-blue-600 mr-4"></i>
                <span>서울, 경기, 인천 전 지역 출장 가능</span>
              </p>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="bg-gray-50 p-8 rounded-lg shadow-lg space-y-4">
               <a 
                href={`tel:${businessPhoneNumber}`}
                className="w-full flex items-center justify-center bg-blue-600 text-white font-bold py-4 px-6 rounded-lg hover:bg-blue-700 transition-all duration-300 text-base transform hover:scale-105"
              >
                <i className="fas fa-phone-alt mr-3"></i>
                전화 상담하기
              </a>
              <a 
                href={kakaoChatUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center bg-[#FEE500] text-[#3C1E1E] font-bold py-4 px-6 rounded-lg hover:bg-yellow-400 transition-all duration-300 text-base transform hover:scale-105"
              >
                <svg
                    className="w-6 h-6 mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24">
                    <path 
                    fill="currentColor" 
                    d="M12 2C6.486 2 2 5.589 2 10c0 2.908 1.898 5.515 4.673 6.912-.343.988-.737 2.13-1.018 2.94-.092.267.12.548.4.548.163 0 .322-.05.452-.143a10.03 10.03 0 0 0 4.21-2.433C11.23 17.939 11.61 18 12 18c5.514 0 10-3.589 10-8s-4.486-8-10-8z"
                    />
                </svg>
                카카오톡 문의
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;