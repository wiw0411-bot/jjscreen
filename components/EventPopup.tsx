
import React, { useEffect, useState } from 'react';
import userPopupImg from '../src/assets/images/user_popup.png';
import { userPopupDataUrl } from '../src/assets/images/userPopupBase64';

interface EventPopupProps {
  isOpen?: boolean;
  onClose?: () => void;
  imageUrl?: string;
  onOpenCalculator?: () => void;
}

const POPUP_DISMISS_KEY = 'jj_event_popup_dismissed_until_v5';

const EventPopup: React.FC<EventPopupProps> = ({
  isOpen: externalIsOpen,
  onClose: externalOnClose,
  imageUrl,
  onOpenCalculator
}) => {
  // Initialize isOpen synchronously to avoid flicker on mount
  const [isOpen, setIsOpen] = useState<boolean>(() => {
    if (externalIsOpen !== undefined) return externalIsOpen;
    try {
      const dismissedUntil = localStorage.getItem(POPUP_DISMISS_KEY);
      if (dismissedUntil) {
        const dismissTime = parseInt(dismissedUntil, 10);
        if (Date.now() < dismissTime) {
          return false;
        }
      }
    } catch (e) {
      // localStorage disabled or error
    }
    return true;
  });

  const [imgSrc, setImgSrc] = useState<string>(() => {
    if (imageUrl && !imageUrl.includes('imgur.com/a/')) {
      return imageUrl;
    }
    return userPopupImg || '/user_popup.png';
  });

  useEffect(() => {
    if (imageUrl && !imageUrl.includes('imgur.com/a/')) {
      setImgSrc(imageUrl);
    } else {
      setImgSrc(userPopupImg || '/user_popup.png');
    }
  }, [imageUrl]);

  useEffect(() => {
    if (externalIsOpen !== undefined) {
      setIsOpen(externalIsOpen);
    }
  }, [externalIsOpen]);

  const handleClose = () => {
    setIsOpen(false);
    if (externalOnClose) externalOnClose();
  };

  const handleDismissToday = () => {
    // Dismiss for 24 hours
    try {
      const tomorrow = Date.now() + 24 * 60 * 60 * 1000;
      localStorage.setItem(POPUP_DISMISS_KEY, tomorrow.toString());
    } catch (e) {
      // ignore
    }
    handleClose();
  };

  const handleImageClick = () => {
    if (onOpenCalculator) {
      handleClose();
      onOpenCalculator();
    }
  };

  const handleImageError = () => {
    if (imgSrc === imageUrl && imageUrl) {
      setImgSrc(userPopupImg);
    } else if (imgSrc === userPopupImg) {
      setImgSrc('/user_popup.png');
    } else if (imgSrc === '/user_popup.png') {
      setImgSrc('https://i.imgur.com/puddVgM.png');
    } else if (imgSrc !== userPopupDataUrl) {
      setImgSrc(userPopupDataUrl);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 transition-opacity duration-300 animate-fade-in"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.45)' }}
      onClick={handleClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-2xl transform transition-all duration-300 animate-scale-in overflow-hidden relative flex flex-col border border-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top close icon button */}
        <button 
          onClick={handleClose}
          className="absolute top-2.5 right-2.5 z-20 bg-black/60 hover:bg-black/80 text-white rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center transition-colors shadow"
          aria-label="닫기"
        >
          <i className="fas fa-times text-xs sm:text-sm"></i>
        </button>

        {/* User Popup Image */}
        <div 
          className="relative bg-white overflow-y-auto max-h-[80vh] sm:max-h-[82vh] cursor-pointer"
          onClick={handleImageClick}
          title="클릭 시 실시간 견적 페이지로 이동"
        >
          <img 
            src={imgSrc} 
            alt="JJ방충망 이벤트 공지 팝업" 
            className="w-full h-auto object-contain block mx-auto" 
            referrerPolicy="no-referrer"
            onError={handleImageError}
          />
        </div>

        {/* Bottom Action Bar */}
        <div className="grid grid-cols-2 border-t border-gray-200 bg-gray-50 text-xs sm:text-sm flex-shrink-0">
          <button 
            onClick={handleDismissToday}
            className="w-full py-3 px-3 text-gray-600 hover:bg-gray-100 font-medium transition-colors text-center border-r border-gray-200"
          >
            오늘 하루 보지 않기
          </button>
          <button 
            onClick={handleClose}
            className="w-full py-3 px-3 text-blue-600 hover:bg-blue-50 font-bold transition-colors text-center"
          >
            닫기
          </button>
        </div>
      </div>

      <style>{`
        .animate-fade-in {
          animation: fade-in 0.25s ease-out forwards;
        }
        .animate-scale-in {
          animation: scale-in 0.25s ease-out forwards;
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
