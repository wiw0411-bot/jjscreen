import React, { useState, useEffect } from 'react';

interface Product {
  title: string;
  price: string;
  imageUrl: string;
  modalImageUrl: string;
  alt: string;
}

interface PriceCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

const ageOptions = [
    { key: '3y', label: '3년 이내' },
    { key: '5y', label: '5년 이내' },
    { key: '10y', label: '10년 이내' },
    { key: '10y+', label: '10년 이상' },
];

const sizeOptions = [
    { key: 'large', label: '대창', description: '세로 120CM 이상' },
    { key: 'medium', label: '중창', description: '세로 70CM 이상' },
    { key: 'small', label: '소창', description: '세로 70CM 이하' },
];

const priceMaps: { [productTitle: string]: { [ageKey: string]: { [sizeKey: string]: number } } } = {
  '촘촘 미세방충망': {
    '3y': { large: 35000, medium: 25000, small: 15000 },
    '5y': { large: 37000, medium: 27000, small: 17000 },
    '10y': { large: 40000, medium: 30000, small: 20000 },
    '10y+': { large: 45000, medium: 35000, small: 25000 },
  },
  '블랙 스텐방충망': {
    '3y': { large: 45000, medium: 35000, small: 25000 },
    '5y': { large: 47000, medium: 37000, small: 27000 },
    '10y': { large: 50000, medium: 40000, small: 30000 },
    '10y+': { large: 55000, medium: 45000, small: 35000 },
  },
};


const useIsMobile = (breakpoint = 768) => {
  const isClient = typeof window === 'object';
  const [isMobile, setIsMobile] = useState(isClient ? window.innerWidth < breakpoint : false);

  useEffect(() => {
    if (!isClient) {
      return;
    }
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [breakpoint, isClient]);

  return isMobile;
};

const SmsRequestModal: React.FC<{onClose: () => void; onConfirm: (phone: string) => Promise<void>; onCloseAll: () => void;}> = ({ onClose, onConfirm, onCloseAll }) => {
    const [phone, setPhone] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async () => {
        if (!phone || !/^\d{10,11}$/.test(phone)) {
            alert('올바른 휴대폰 번호를 입력해주세요 (10-11자리 숫자).');
            return;
        }
        setIsLoading(true);
        setError(null);

        const TIMEOUT_DURATION = 15000; // 15초 타임아웃

        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('timeout')), TIMEOUT_DURATION)
        );

        try {
            await Promise.race([onConfirm(phone), timeoutPromise]);
            setIsSubmitted(true);
        } catch (err: any) {
            console.error('SMS request submission failed:', err);
            if (err.message === 'timeout') {
                setError('전송 시간이 초과되었습니다. 미리보기 환경에서는 외부 API 호출이 제한될 수 있습니다.');
            } else {
                setError(err.message || '견적 문자 발송에 실패했습니다. 잠시 후 다시 시도해주세요.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="absolute inset-0 bg-white bg-opacity-95 z-10 flex items-start sm:items-center justify-center p-8 pt-20 sm:pt-8 rounded-xl" onClick={e => e.stopPropagation()}>
             {isSubmitted ? (
                 <div className="text-center w-full">
                    <i className="fas fa-check-circle text-green-500 text-6xl mb-6"></i>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">전송 완료!</h3>
                    <p className="text-gray-600 mb-8">입력하신 번호로 견적 문자가 발송되었습니다.</p>
                    <button onClick={onCloseAll} className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300 text-lg">
                        확인
                    </button>
                </div>
            ) : (
                <>
                    <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors" aria-label="닫기">
                        <i className="fas fa-times text-3xl"></i>
                    </button>
                    <div className="text-center w-full">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 break-keep">견적을 문자로 받아보시겠어요?</h3>
                        <p className="text-sm sm:text-base text-gray-600 mb-6 break-keep">아래 휴대폰 번호로 견적 내용을 바로 보내드립니다.</p>
                        <input 
                            type="tel" 
                            placeholder="휴대폰 번호 ('-' 없이 입력)"
                            value={phone}
                            onChange={e => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                            className="w-full px-4 py-3 border border-gray-200 bg-gray-100 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg mb-4 text-center"
                        />
                         {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                        <button onClick={handleSubmit} disabled={isLoading} className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300 text-lg mb-2 disabled:bg-gray-400 disabled:cursor-not-allowed">
                            {isLoading ? '전송 중...' : '견적 문자로 받기'}
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}


const PriceCalculatorModal: React.FC<PriceCalculatorModalProps> = ({ isOpen, onClose, product }) => {
  const [selectedAge, setSelectedAge] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({ large: 0, medium: 0, small: 0 });
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [showSmsModal, setShowSmsModal] = useState(false);
  const isMobile = useIsMobile();
  const businessPhoneNumber = '010-2846-9820';

  useEffect(() => {
    if (selectedAge && product) {
      const currentPriceMap = priceMaps[product.title];
      if (!currentPriceMap) {
          setEstimatedPrice(0);
          return;
      }

      const totalCost = Object.keys(quantities).reduce((sum, sizeKey) => {
        const price = currentPriceMap[selectedAge]?.[sizeKey] ?? 0;
        const quantity = quantities[sizeKey];
        return sum + (price * quantity);
      }, 0);
      setEstimatedPrice(totalCost);
    } else {
      setEstimatedPrice(0);
    }
  }, [selectedAge, quantities, product]);
  
  // Reset fields when product changes or modal closes
  useEffect(() => {
    if (!isOpen) {
        setShowSmsModal(false);
    }
    setSelectedAge(null);
    setQuantities({ large: 0, medium: 0, small: 0 });
  }, [product, isOpen]);

  const handleQuantityChange = (sizeKey: string, delta: number) => {
    setQuantities(prev => ({
        ...prev,
        [sizeKey]: Math.max(0, prev[sizeKey] + delta)
    }));
  };

  const totalQuantity = Object.keys(quantities).reduce((sum, key) => sum + quantities[key], 0);
  const isQuoteValid = !!product && !!selectedAge && totalQuantity > 0;

  const handleRequestSms = () => {
    if (!isQuoteValid) {
      alert('건물 연식을 선택하고, 1개 이상의 수량을 입력해주세요.');
      return;
    }
    setShowSmsModal(true);
  };

  const handleSmsConfirm = async (phone: string) => {
    if (!isQuoteValid || !product || !selectedAge) {
      throw new Error("견적 정보가 올바르지 않습니다.");
    }

    const ageLabel = ageOptions.find(o => o.key === selectedAge)?.label || '알 수 없음';
    const breakdown = sizeOptions
        .filter(o => quantities[o.key] > 0)
        .map(o => `${o.label}: ${quantities[o.key]}개`)
        .join(', ');
    
    const message = `[JJ방충망] 요청하신 견적입니다.
- 상품: ${product.title}
- 연식: ${ageLabel}
- 수량: ${breakdown}
- 금액: ${estimatedPrice.toLocaleString('ko-KR')}원
* 10만원 이하 시 출장비 3만원 별도
* 시공문의: ${businessPhoneNumber}`;

    const response = await fetch('/api/send-sms', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            to: phone,
            message: message,
        }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: '서버에서 예상치 못한 응답을 보냈습니다.' }));
        throw new Error(errorData.message || '문자 발송에 실패했습니다.');
    }
  }
  
  if (!isOpen || !product) return null;
  
  const currentPriceMap = priceMaps[product.title];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl transform transition-all duration-300 scale-100 animate-fade-in-up relative overflow-hidden" onClick={(e) => e.stopPropagation()}>
        {showSmsModal && <SmsRequestModal onClose={() => setShowSmsModal(false)} onConfirm={handleSmsConfirm} onCloseAll={onClose} />}
        
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">{product.title} 가격 계산</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <i className="fas fa-times text-2xl"></i>
          </button>
        </div>
        
        <div className="p-8 space-y-6 overflow-y-auto" style={{maxHeight: '65vh'}}>
            <div className="flex items-center bg-blue-50 p-4 rounded-lg">
                <img src={product.modalImageUrl} alt={`${product.title} 시공 이미지`} className="w-16 h-16 rounded-md object-cover mr-4" />
                <div>
                    <h4 className="font-bold text-gray-800 text-sm sm:text-base">미닫이(옆으로 여는)방충망</h4>
                    <p className="text-sm text-gray-600">
                        본 견적은 일반적인 미닫이 방충망 교체 기준입니다.<br/>(롤방충망은 제외)
                    </p>
                </div>
            </div>

            <div>
                <label className="block text-lg font-semibold text-gray-700 mb-3">1. 건물 연식 선택</label>
                <div className="grid grid-cols-2 gap-3">
                    {ageOptions.map(option => (
                        <button key={option.key} onClick={() => setSelectedAge(option.key)} className={`p-3 rounded-lg font-semibold transition-colors text-center ${selectedAge === option.key ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-lg font-semibold text-gray-700 mb-3">2. 사이즈별 수량 선택</label>
                <div className="space-y-3">
                    {sizeOptions.map(option => (
                        <div key={option.key} className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
                            <div className="flex-grow pr-4">
                                <span className="font-bold text-lg block md:inline">{option.label}</span>
                                <span className="text-sm text-gray-500 block md:inline md:ml-2">{option.description}</span>
                                {selectedAge && currentPriceMap && (
                                    <p className="text-sm text-blue-600 font-semibold mt-1">
                                        개당 {currentPriceMap[selectedAge]?.[option.key]?.toLocaleString('ko-KR')}원
                                    </p>
                                )}
                            </div>
                            <div className="flex items-center justify-center space-x-2 border border-gray-300 rounded-lg p-1 bg-white flex-shrink-0">
                                <button onClick={() => handleQuantityChange(option.key, -1)} className="w-8 h-8 text-xl font-bold text-blue-600 rounded-md hover:bg-blue-50 transition">-</button>
                                <input 
                                    type="number" 
                                    value={quantities[option.key]}
                                    readOnly
                                    className="w-10 h-8 text-center text-lg font-bold border-none bg-transparent focus:ring-0"
                                />
                                <button onClick={() => handleQuantityChange(option.key, 1)} className="w-8 h-8 text-xl font-bold text-blue-600 rounded-md hover:bg-blue-50 transition">+</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="text-center bg-gray-50 p-6 rounded-lg">
                <p className="text-lg text-gray-600">총 예상 시공 비용</p>
                <p className="text-4xl font-extrabold text-blue-600 my-2">
                {estimatedPrice.toLocaleString('ko-KR')}원
                </p>
                <p className="text-xs text-gray-500">* 자재비+시공비 포함가이며, 10만원이하 견적은 출장비 3만원 발생합니다.</p>
            </div>
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-200 rounded-b-xl">
             <div className="flex items-center space-x-4">
                <button onClick={handleRequestSms} disabled={!isQuoteValid} className="w-1/2 bg-gray-700 text-white font-bold py-4 px-6 rounded-lg hover:bg-gray-800 transition-colors duration-300 text-base text-center leading-snug disabled:bg-gray-400 disabled:cursor-not-allowed">
                    견적 저장<br/><span className="text-sm font-normal">(문자 자동발송)</span>
                </button>
                <a href={`tel:${businessPhoneNumber}`} className="w-1/2 bg-blue-600 text-white font-bold py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300 text-base text-center leading-snug">
                    시공문의<br/><span className="text-sm font-normal">(전화걸기)</span>
                </a>
             </div>
        </div>
      </div>
       <style>{`
          .animate-fade-in-up {
            animation: fade-in-up 0.3s ease-out forwards;
          }
          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          input[type="number"]::-webkit-inner-spin-button,
          input[type="number"]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
          input[type="number"] {
            -moz-appearance: textfield;
          }
      `}</style>
    </div>
  );
};

export default PriceCalculatorModal;