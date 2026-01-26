import React from 'react';

interface FeatureItemProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, title, description }) => (
    <div className="aspect-square text-center p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center justify-center">
        <div className="text-blue-600 text-3xl mb-3 inline-block">
            <i className={`fas ${icon}`}></i>
        </div>
        <h3 className="text-base font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-600 px-2">{description}</p>
    </div>
);

const Features: React.FC = () => {
  const features = [
    {
      icon: 'fa-gem',
      title: '최고급 국산 자재',
      description: '내구성이 뛰어난 고품질 원자재만 사용합니다.',
    },
    {
      icon: 'fa-hand-holding-usd',
      title: '합리적인 가격',
      description: '공장 직거래로 유통 마진 없는 가격을 제공합니다.',
    },
    {
      icon: 'fa-tools',
      title: '경력 전문가',
      description: '오랜 노하우로 어떤 현장이든 완벽 시공합니다.',
    },
    {
      icon: 'fa-headset',
      title: '철저한 A/S',
      description: '시공 후 문제 발생 시 신속하게 책임지고 해결합니다.',
    },
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold">왜 JJ방충망일까요?</h2>
          <p className="text-base text-gray-600 mt-4">최고의 품질과 서비스로 고객 만족을 약속합니다.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <FeatureItem key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;