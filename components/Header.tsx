
import React from 'react';

const Header: React.FC = () => {

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold text-blue-600">JJ방충망</a>
        
        <a href="#contact" onClick={(e) => handleLinkClick(e, '#contact')} className="inline-block bg-blue-600 text-white font-semibold px-6 py-2 rounded-full hover:bg-blue-700 transition-all transform hover:scale-105">
          무료 견적 받기
        </a>
      </div>
    </header>
  );
};

export default Header;
