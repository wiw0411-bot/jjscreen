import React from 'react';

const highlightsData = [
  {
    icon: 'fa-gem',
    title: '최고급 국산 자재',
    description: '내구성이 뛰어난 고품질 원자재만 사용합니다.',
    bgColor: 'bg-cyan-100',
    iconColor: 'text-cyan-600',
  },
  {
    icon: 'fa-hand-holding-usd',
    title: '합리적인 가격',
    description: '공장 직거래로 유통 마진 없는 가격을 제공합니다.',
    bgColor: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
  },
  {
    icon: 'fa-tools',
    title: '경력 전문가',
    description: '오랜 노하우로 어떤 현장이든 완벽 시공합니다.',
    bgColor: 'bg-amber-100',
    iconColor: 'text-amber-600',
  },
  {
    icon: 'fa-headset',
    title: '철저한 A/S',
    description: '시공 후 문제 발생 시 신속하게 책임지고 해결합니다.',
    bgColor: 'bg-orange-100',
    iconColor: 'text-orange-600',
  },
];

const HighlightCard: React.FC<typeof highlightsData[0]> = ({ icon, title, description, bgColor, iconColor }) => (
    <div className={`${bgColor} rounded-xl p-6 text-center`}>
        <i className={`fas ${icon} text-3xl ${iconColor} mb-4`}></i>
        <div>
            <h3 className={`font-bold text-gray-800 text-base`}>{title}</h3>
            <p className={`text-xs text-gray-700 mt-1`}>{description}</p>
        </div>
    </div>
);


const Highlights: React.FC = () => {
  return (
    <section className="bg-gray-100 pt-8 pb-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {highlightsData.map((item, index) => (
            <HighlightCard key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Highlights;