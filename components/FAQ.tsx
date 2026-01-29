
import React from 'react';

interface FaqItemProps {
  number: string;
  title: string;
  description: string[];
}

const FaqItem: React.FC<FaqItemProps> = ({ number, title, description }) => (
  <div className="group flex flex-col text-left p-4 bg-gray-50 rounded-lg border border-gray-200 h-full transition-all duration-300 hover:shadow-lg hover:border-blue-500">
    <span className="text-3xl font-light text-gray-400 mb-3 transition-colors duration-300 group-hover:text-blue-600">{number}</span>
    <h3 className="text-base font-bold text-gray-900 mb-2 relative inline-block pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-8 after:h-0.5 after:bg-blue-600">
        {title}
    </h3>
    <div className="text-gray-600 text-xs space-y-1 break-keep">
        {description.map((line, index) => (
            <p key={index}>{line}</p>
        ))}
    </div>
  </div>
);

const FAQ: React.FC = () => {
  const faqData = [
    {
      number: '01',
      title: '시공 과정',
      description: ['카카오톡,전화상으로 시공 신청 › 시공 날짜,시간 조율 › 담당 설치 기사 배정 › 시공 당일 미리 연락 후 방문'],
    },
    {
      number: '02',
      title: '시공 장소',
      description: ['방충망 먼지,철가루 등으로 인하여 샷시 탈거 후 지하주차장 또는 외부에서 방충망 교체 후 설치'],
    },
    {
      number: '03',
      title: '시공 시간',
      description: ['1시간30분~2시간 정도 소요', '단, 샷시 컨디션에 따라 시공시간 차이 있음'],
    },
    {
      number: '04',
      title: '시공 예약 관련',
      description: ['월~일 오전 10시~오후 3시 타임까지 시공 예약 가능'],
    },
    {
      number: '05',
      title: '방충망 제품',
      description: ['모노필라멘트 미세방충망,블랙스텐망 사용'],
    },
    {
      number: '06',
      title: '시공 불가한 곳',
      description: ['안전방범창이 설치 된 곳은 시공 불가'],
    },
    {
      number: '07',
      title: 'A/S 기간',
      description: ['24개월 무료 A/S 가능', '사용자 부주의로 인한 파손, 탈거는', 'A/S 비용 발생'],
    },
    {
      number: '08',
      title: '출장비',
      description: ['10만원 이하 시공은 출장비 3만원 발생'],
    },
  ];

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold">자주묻는질문</h2>
          <p className="text-base text-gray-600 mt-4">자주묻는질문을 통해 궁금증을 해소하세요.</p>
          <div className="mt-8">
            <i className="fas fa-chevron-down text-2xl text-gray-400 animate-bounce"></i>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {faqData.map((item, index) => (
            <FaqItem key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;