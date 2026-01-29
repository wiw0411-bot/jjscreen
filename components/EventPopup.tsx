
import React from 'react';

interface EventPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onDismissToday: () => void;
  imageUrl: string;
}

const EventPopup: React.FC<EventPopupProps> = ({ isOpen, onClose, onDismissToday, imageUrl }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 transition-opacity duration-300 animate-fade-in"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-white rounded-lg shadow-2xl w-full max-w-sm md:max-w-xl transform transition-all duration-300 animate-scale-in overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
            <img src={imageUrl} alt="자동 견적 기능 안내 팝업" className="w-full h-auto object-contain" />
        </div>
        <div className="grid grid-cols-2">
          <button 
            onClick={onDismissToday}
            className="w-full bg-gray-700 text-white font-semibold py-3 px-4 hover:bg-gray-800 transition-colors duration-200 text-sm"
            aria-label="오늘 하루 이 팝업 보지 않기"
          >
            오늘 하루 보지 않기
          </button>
          <button 
            onClick={onClose}
            className="w-full bg-gray-200 text-gray-800 font-semibold py-3 px-4 hover:bg-gray-300 transition-colors duration-200 text-sm"
            aria-label="팝업 닫기"
          >
            닫기
          </button>
        </div>
      </div>
      <style>{`
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        .animate-scale-in {
            animation: scale-in 0.3s ease-out forwards;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
            from { transform: scale(0.95); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default EventPopup;
