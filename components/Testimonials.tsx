import React, { useState, useRef, useEffect } from 'react';

// New data structure inspired by the screenshot
const testimonialsData = [
  {
    reviewer: '김OO님',
    overallRating: 5.0,
    comment: '이사는 곳이 단지 정원뷰라 그런지 창문 열면 작은 벌레들이 들어와요... 여기 저기 알아보다가 가장 저렴해서 여기로 결정했는데... 젊은 사장님이 깔끔하게 교체해 주시고 가셔서 만족합니다. ^^',
    ratings: {
      '시공만족도': 5.0,
      '가격만족도': 5.0,
      '친절도': 5.0,
      '전문성': 5.0,
    },
    imageUrl: 'https://i.imgur.com/OJjO8ue.jpeg',
  },
  {
    reviewer: '박OO님',
    overallRating: 4.8,
    comment: '완전 추천합니다! 가격 이런 가격 못본것같아요. 추가 요금 일절x. 만족도 굿! 곧 아이를 낳게되서 그전에 방충망 바꾸고 싶어 여기저기 알아보다가 jj에서 했는데 진짜 합리적! 후회안합니다. 사장님 방문하시자마자 각 방 방충망 착착 떼어가셔서 지하주차장에서 작업 후 올라오셔서 다시 붙여주는 데 정말 손도 빠릅니다!',
    ratings: {
      '시공만족도': 5.0,
      '가격만족도': 5.0,
      '친절도': 4.5,
      '전문성': 5.0,
    },
    imageUrl: 'https://i.imgur.com/L0Izf0J.jpeg',
  },
  {
    reviewer: '최OO님',
    overallRating: 5.0,
    comment: '추가 사용 후기!! 촘촘망에 틈새방지까지 했더니 모기 잘물리는 남편이 확실히 모기가 줄어든다고 굿입니다. 👍👍👍 다들 건강한 여름 나시길~',
    ratings: {
      '시공만족도': 5.0,
      '가격만족도': 5.0,
      '친절도': 5.0,
      '전문성': 5.0,
    },
    imageUrl: 'https://i.imgur.com/CGFxnWI.jpeg',
  },
  {
    reviewer: '이OO님',
    overallRating: 5.0,
    comment: '고양이가 자꾸 방충망을 긁어서 찢어질까봐 걱정했는데, 튼튼한 블랙 스텐방충망으로 교체하고 나니 마음이 놓여요. 이제 안심하고 창문 열어놓을 수 있겠어요. 시공도 엄청 꼼꼼하게 해주셨어요!',
    ratings: {
      '시공만족도': 5.0,
      '가격만족도': 4.5,
      '친절도': 5.0,
      '전문성': 5.0,
    },
    imageUrl: 'https://i.imgur.com/eykFDw1.jpeg',
  },
  {
    reviewer: '정OO님',
    overallRating: 4.9,
    comment: '오래된 아파트라 샷시 상태가 안 좋아서 걱정했는데, 사장님께서 노하우로 깔끔하게 맞춰주셨습니다. 이전보다 훨씬 집이 깨끗해 보이고 벌레 걱정도 없어져서 너무 만족스럽습니다. 주변에도 추천하고 있어요.',
    ratings: {
      '시공만족도': 5.0,
      '가격만족도': 4.8,
      '친절도': 5.0,
      '전문성': 5.0,
    },
    imageUrl: 'https://i.imgur.com/NccQwux.jpeg',
  },
  {
    reviewer: '윤OO님',
    overallRating: 5.0,
    comment: '시간 약속 정확하게 지켜주시고, 작업도 신속하게 마무리해주셔서 좋았습니다. 방충망 교체 하나만으로도 이렇게까지 시야가 선명해질 줄 몰랐네요. 진작 할 걸 그랬어요. 감사합니다!',
    ratings: {
      '시공만족도': 5.0,
      '가격만족도': 5.0,
      '친절도': 5.0,
      '전문성': 5.0,
    },
    imageUrl: 'https://i.imgur.com/fTjO6vo.jpeg',
  },
];


const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center text-yellow-400">
      {[...Array(fullStars)].map((_, i) => <i key={`full-${i}`} className="fas fa-star"></i>)}
      {halfStar && <i className="fas fa-star-half-alt"></i>}
      {[...Array(emptyStars)].map((_, i) => <i key={`empty-${i}`} className="far fa-star"></i>)}
    </div>
  );
};

const RatingBar: React.FC<{ label: string; score: number }> = ({ label, score }) => {
  const widthPercentage = (score / 5) * 100;
  return (
    <div className="flex items-center text-sm">
      <span className="w-20 text-gray-600 flex-shrink-0">{label}</span>
      <div className="w-full bg-gray-200 rounded-full h-2 mx-3">
        <div 
          className="bg-yellow-400 h-2 rounded-full" 
          style={{ width: `${widthPercentage}%` }}
        ></div>
      </div>
      <span className="font-semibold text-gray-800 w-8 text-right">{score.toFixed(1)}</span>
    </div>
  );
};

// FIX: An interface can only extend a simple identifier, not a complex type expression like `(typeof testimonialsData)[0]`. Changed to a type alias using an intersection (&) to correctly combine the inferred type with additional properties.
type TestimonialCardProps = (typeof testimonialsData)[0] & {
  hasMargin?: boolean;
};

const TestimonialCard: React.FC<TestimonialCardProps> = ({ hasMargin = true, ...testimonial }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const commentRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (commentRef.current) {
        const isClamped = commentRef.current.scrollHeight > commentRef.current.clientHeight;
        setShowMoreButton(isClamped);
      }
    };

    // A brief delay before the first check ensures that the layout has stabilized,
    // which is particularly important on mobile devices with dynamic widths.
    const timeoutId = setTimeout(checkOverflow, 50);

    // Re-check whenever the window is resized, as this can affect clamping.
    window.addEventListener('resize', checkOverflow);

    // Cleanup function to prevent memory leaks.
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', checkOverflow);
    };
  }, []);

  return (
    <div className={`bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden ${hasMargin ? 'mb-8' : ''}`}>
      <div className="p-6">
        <div className="border rounded-lg p-4 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="flex justify-center">
            <img src={testimonial.imageUrl} alt="시공 후기 사진" className="w-56 h-56 rounded-lg object-cover" />
          </div>
          <div className="flex flex-col items-center justify-center space-y-2">
            <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full">Perfect</span>
            <span className="text-3xl font-bold text-gray-800">{testimonial.overallRating.toFixed(1)} <span className="text-lg font-medium text-gray-500">/ 5</span></span>
            <StarRating rating={testimonial.overallRating} />
          </div>
          <div className="space-y-3 flex flex-col justify-center">
              {Object.entries(testimonial.ratings).map(([label, score]) => (
                  <RatingBar key={label} label={label} score={score} />
              ))}
          </div>
        </div>
        <div className="mt-4">
          <p 
            ref={commentRef}
            className={`text-gray-700 leading-relaxed break-keep ${!isExpanded ? 'line-clamp-3' : ''}`}
            >
              <span className="font-semibold text-gray-900">{testimonial.reviewer}: </span>
              {testimonial.comment}
          </p>
          {showMoreButton && (
              <button 
              onClick={() => setIsExpanded(!isExpanded)} 
              className="text-sm font-semibold text-blue-600 hover:underline mt-2 focus:outline-none"
              aria-expanded={isExpanded}
              >
              {isExpanded ? '접기' : '더보기'}
              </button>
          )}
        </div>
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slider = scrollRef.current;
    if (!slider) return;

    const interval = setInterval(() => {
      if (document.hidden) return;

      const card = slider.querySelector(':scope > div') as HTMLElement;
      if (!card) return;

      const cardWidth = card.offsetWidth;
      const gap = 16;
      
      const isAtEnd = slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 1;

      if (isAtEnd) {
        slider.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        slider.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto mb-12 h-28 md:h-36 rounded-lg overflow-hidden shadow-lg">
            {/* Mobile Banner */}
            <img src="https://i.imgur.com/QFIW7gN.jpeg" alt="생생한 시공 후기" className="w-full h-full object-cover md:hidden" />
            {/* Desktop Banner */}
            <img src="https://i.imgur.com/ZzDTMaO.jpeg" alt="생생한 시공 후기" className="w-full h-full object-cover hidden md:block" />
        </div>
        
        {/* Mobile Carousel */}
        <div className="md:hidden">
            <div 
                ref={scrollRef}
                className="flex overflow-x-auto snap-x snap-mandatory py-4 -mx-6 px-6 space-x-4 no-scrollbar"
            >
                <style>{`.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
                {testimonialsData.map((testimonial, index) => (
                    <div key={index} className="snap-start w-[85%] sm:w-4/5 flex-shrink-0">
                        <TestimonialCard {...testimonial} hasMargin={false} />
                    </div>
                ))}
            </div>
        </div>

        {/* Desktop List */}
        <div className="hidden md:block max-w-4xl mx-auto">
          {testimonialsData.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;