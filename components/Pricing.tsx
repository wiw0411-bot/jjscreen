
import React from 'react';

interface PricingTierProps {
  name: string;
  price: string;
  priceDetails: string;
  description: string;
  features: string[];
  isRecommended?: boolean;
  timeline: string;
}

const PricingTier: React.FC<PricingTierProps> = ({ name, price, priceDetails, description, features, isRecommended, timeline }) => {
  return (
    <div className={`relative flex flex-col rounded-xl border ${isRecommended ? 'border-blue-600' : 'border-gray-200'} bg-white shadow-lg p-6`}>
      {isRecommended && (
        <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center rounded-full bg-blue-600 px-4 py-1.5 text-sm font-semibold text-white">
            가장 많이 찾는 상품
          </span>
        </div>
      )}
      <div className="flex-grow">
        <h3 className="text-xl font-bold text-gray-900">{name}</h3>
        <p className="mt-2 text-sm text-gray-500">{description}</p>
        <div className="mt-4">
          <span className="text-4xl font-extrabold text-gray-900">{price}</span>
          <span className="ml-1 text-base font-medium text-gray-500">{priceDetails}</span>
        </div>
        <ul className="mt-6 space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <i className="fas fa-check-circle text-blue-600 mr-3 mt-1 flex-shrink-0"></i>
              <span className="text-sm text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-8">
         <div className="text-center text-sm text-gray-500 mb-4">
            <i className="fas fa-clock mr-2"></i>
            예상 제작 기간: {timeline}
         </div>
        <a href="#contact" className={`block w-full rounded-lg px-6 py-3 text-center text-base font-semibold ${isRecommended ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}>
          상담 신청하기
        </a>
      </div>
    </div>
  );
};


const Pricing: React.FC = () => {
    const tiers = [
        {
            name: '기본형',
            price: '99',
            priceDetails: '만원',
            description: '처음 홈페이지를 만드시는 사장님께 적합한 실속 패키지',
            features: [
                '5페이지 내외 맞춤형 디자인',
                'PC/모바일 반응형 웹사이트',
                '업체소개, 서비스안내, 시공사례, 문의',
                '기본 SEO 최적화 (검색엔진 등록)',
                '카카오톡 상담 연동',
                '무료 호스팅 및 보안서버(SSL)',
            ],
            timeline: '약 2주'
        },
        {
            name: '표준형',
            price: '139',
            priceDetails: '만원',
            description: '자동화 기능으로 고객 관리까지 한번에 해결하는 추천 패키지',
            features: [
                '기본형 모든 기능 포함',
                '자동 견적 계산 및 문자 발송 기능',
                '8페이지 내외의 풍부한 구성',
                '블로그/공지사항 기능 추가',
                '고급 SEO 최적화',
                '네이버/구글 지도 등록 지원',
            ],
            isRecommended: true,
            timeline: '약 3주'
        },
        {
            name: '프리미엄형',
            price: '별도 문의',
            priceDetails: '',
            description: '온라인 결제, 예약 등 사업 확장을 위한 맞춤 제작 패키지',
            features: [
                '표준형 모든 기능 포함',
                '회원가입 및 고객 관리 기능',
                '온라인 예약/결제 시스템 연동',
                '사장님 맞춤 기능 추가 개발',
                '데이터베이스 설계 및 구축',
                '관리자 페이지 기능 강화',
            ],
            timeline: '별도 협의'
        }
    ];

    const commonFeatures = [
        { icon: 'fa-globe', title: '도메인 연결 기술지원', description: '구매하신 도메인을 웹사이트에 연결해드립니다.' },
        { icon: 'fa-book', title: '기본 운영 가이드 제공', description: '완성된 웹사이트를 직접 관리하는 방법을 안내해드립니다.' },
        { icon: 'fa-shield-alt', title: '무료 보안서버 (SSL)', description: '모든 웹사이트에 SSL을 적용하여 보안을 강화합니다.' },
        { icon: 'fa-server', title: '글로벌 CDN 서버 호스팅', description: '전세계 어디서든 빠른 속도를 제공하는 Vercel 서버를 사용합니다.' },
    ];
    
    const optionalFeatures = [
        { title: '로고 디자인', price: '10만원~' },
        { title: '추가 페이지 제작', price: '페이지당 5만원' },
        { title: '전문 유지보수', price: '월 5만원~' },
        { title: '온라인 광고 대행', price: '별도 문의' },
    ];


  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold">합리적인 웹사이트 제작 비용</h2>
          <p className="text-base text-gray-600 mt-4 max-w-2xl mx-auto break-keep">
            방충망 사장님들의 성공을 위해 거품을 뺀 가격으로 최고의 결과물을 만들어 드립니다.<br/>아래 패키지를 비교해보시고, 딱 맞는 플랜을 선택하세요.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {tiers.map((tier, index) => (
                <PricingTier key={index} {...tier} />
            ))}
        </div>

        <div className="mt-20">
            <h3 className="text-xl md:text-2xl font-bold text-center mb-10">모든 플랜 공통 제공 서비스</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {commonFeatures.map((feature, index) => (
                    <div key={index} className="text-center p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
                        <div className="text-blue-600 text-3xl mb-4">
                            <i className={`fas ${feature.icon}`}></i>
                        </div>
                        <h4 className="font-semibold text-base mb-2">{feature.title}</h4>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>

        <div className="mt-16 bg-white p-8 rounded-lg shadow-md border border-gray-200 max-w-4xl mx-auto">
            <h3 className="text-xl md:text-2xl font-bold text-center mb-8">추가 선택 옵션</h3>
            <div className="divide-y divide-gray-200">
            {optionalFeatures.map((feature, index) => (
                <div key={index} className="flex justify-between items-center py-4">
                    <span className="text-base font-medium text-gray-800">{feature.title}</span>
                    <span className="text-base font-semibold text-blue-600">{feature.price}</span>
                </div>
            ))}
            </div>
            <p className="text-center text-sm text-gray-500 mt-6">* 원하시는 기능이 없으신가요? 편하게 문의주시면 맞춤 견적을 내어 드립니다.</p>
        </div>

      </div>
    </section>
  );
};

export default Pricing;
