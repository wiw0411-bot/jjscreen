import React, { useState } from 'react';

interface TestimonialCardProps {
  image: string;
  title: string;
  text: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ image, title, text }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const truncateLength = 75;
  const isTruncatable = text.length > truncateLength;
  const displayText = isExpanded ? text : `${text.substring(0, truncateLength)}${isTruncatable ? '...' : ''}`;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-start gap-4 shadow-sm transition-shadow hover:shadow-md">
      <img src={image} alt={title} className="w-24 h-24 md:w-28 md:h-28 object-cover rounded-md flex-shrink-0" />
      <div className="flex-grow flex flex-col self-stretch min-w-0">
        <div className="flex items-center mb-1">
          <div className="text-yellow-400 text-sm flex-shrink-0">
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
          </div>
          <h3 className={`text-md font-bold text-gray-800 ml-3 ${!isExpanded ? 'truncate' : ''}`} title={title}>{title}</h3>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed flex-grow min-h-[60px]">
          {displayText}
        </p>
        {isTruncatable && (
          <div className="text-right mt-auto pt-1">
            <button 
              onClick={() => setIsExpanded(!isExpanded)} 
              className="text-blue-600 font-semibold text-sm hover:underline"
            >
              {isExpanded ? '접기' : '더보기'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      image: 'https://i.imgur.com/OJjO8ue.jpeg',
      title: '강력 추천합니다',
      text: '이사는 곳이 단지 정원뷰라 그런지 창문 열면 작은 벌레들이 들어와요... 방충망 너무 오래되어 교체했는데 확실히 벌레를 막아주니 저녁엔 창문 열어 놓고 있어요... 여기 저기 알아보다가 가장 저렴해서 여기로 결정했는데... 젊은 사장님이 깔끔하게 교체해 주시고 가셔서 만족합니다. ^^ 구멍 막는 스티커도 주시...'
    },
    {
      image: 'https://i.imgur.com/L0Izf0J.jpeg',
      title: '물구멍 스티커 서비스 감사해욧!',
      text: '완전 추천합니다! 1가격 이런 가격 못본것같아요. 추가 요금 일절x. 만족도 곧 아이를 낳게되서 그전에 방충망 바꾸고 싶어 여기저기 알아보다가 jj에서 했는데 진짜 합리적 후회안만합니다. 사장님 방문하시자마자 각 방 방충망 착착 떼어가셔서 지하주차장에서 작업 후 올라오셔서 다시 붙여주는 시스템이...'
    },
    {
      image: 'https://i.imgur.com/CGFxnWI.jpeg',
      title: '추천,친절,가격 모두 별 다섯개 드리고 싶은 곳이에요 정말!',
      text: '추가 사용 후기!! 촘촘망에 틈새방지까지 했더니 모기 잘물리는 남편이 확실히 모기가 줄어든다고 굿입니다. 👍👍👍 다들 건강한 여름 나시길~ ================== 우와..오랜 숙원이였던 방충망을 드디어 교체 했습니다. 너무 저렴한 가격에 의심~?ㅎㅎ 후기보고 신청했는데 방충망 싹아서...'
    },
    {
      image: 'https://i.imgur.com/NccQwux.jpeg',
      title: '엄청 촘촘해서 모기 절대 못들어오네요!',
      text: '지인소개로 jj방충망 알게되서 시공했는데요 ㅋㅋ 우선 가격이 진짜 싸요! 방충망이 없는거 같이 촘촘하면서도 밝고요~ 마음에 들어서 들어서 동생네도 예약했네요!! 혹시 방충망이 낡았고 저희처럼 구멍 나셨음 추천합니다!'
    },
    {
      image: 'https://i.imgur.com/eykFDw1.jpeg',
      title: '정말 저렴하게 시공했어요!!',
      text: '부모님 댁에 오래된 방충망인데 무더운 여름전에 깔끔하게 수리했습니다. 수리 않나 오래된 집이라 방충망이 항상 거슬렸는데 jj방충망 사장님이 말끔하게 만들어 주셨습니다. 기본 메쉬망보다 엄청 촘촘해서 메쉬망이 없는것 같은 착각이 드네요. 다른 업체들은 기본 알루미늄망 이여서 촘촘망으로 하려면 추...'
    },
    {
      image: 'https://i.imgur.com/fTjO6vo.jpeg',
      title: '정말 만족합니다👍',
      text: '후기 잘 안남기는데... 넘 만족해서 남겨요 젊은 사장님 꼼꼼하시고 무척 친절하세요. 추가금없이 이 가격은 그 어느곳도 없을듯요. 방충망 퀄리티도 최고입니다ㅋ 강추합니다~~~~'
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold">생생한 시공 후기</h2>
          <p className="text-base text-gray-600 mt-4">실제 고객님들이 남겨주신 소중한 후기입니다.</p>
        </div>
        <div className="max-w-4xl mx-auto space-y-6">
          {testimonials.slice(0, 6).map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;