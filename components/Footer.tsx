
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-blue-400 mb-4">JJ방충망</h3>
            <p className="text-gray-400">언제나 고객님의 편안한 생활 환경을 위해 최선을 다하겠습니다.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">업체 정보</h4>
            <ul className="space-y-2 text-gray-400">
              <li>상호: JJ방충망</li>
              <li>대표: 주동준</li>
              <li>전화: 010-2846-9820</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} JJ방충망. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
