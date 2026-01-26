
import React, { useState } from 'react';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Formspree requires a specific header for AJAX submissions
    const response = await fetch(e.currentTarget.action, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Accept': 'application/json'
        }
    });

    if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', phone: '', address: '', message: ''});
    } else {
        // Handle error - maybe show an error message
        alert("메시지 전송에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="lg:w-1/2 lg:pr-12 mb-12 lg:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold">무료 견적 및 상담 문의</h2>
            <p className="text-lg text-gray-600 mt-4 mb-6">
              궁금한 점이 있으신가요? 아래 양식을 작성해주시면 신속하게 연락드리겠습니다.
              전화 상담도 언제나 환영합니다.
            </p>
            <div className="space-y-4 text-lg">
              <p className="flex items-center">
                <i className="fas fa-phone-alt text-blue-600 mr-4"></i>
                <a href="tel:010-2846-9820" className="text-gray-800 hover:text-blue-600">010-2846-9820</a>
              </p>
              <p className="flex items-center">
                <i className="fas fa-map-marker-alt text-blue-600 mr-4"></i>
                <span>서울, 경기, 인천 전 지역 출장 가능</span>
              </p>
            </div>
          </div>
          <div className="lg:w-1/2">
            {isSubmitted ? (
              <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-6 rounded-lg shadow-md" role="alert">
                <p className="font-bold text-xl">문의가 성공적으로 접수되었습니다.</p>
                <p>빠른 시일 내에 연락드리겠습니다. 감사합니다!</p>
              </div>
            ) : (
              <form 
                onSubmit={handleSubmit} 
                action="https://formspree.io/f/YOUR_UNIQUE_ID" // TODO: Replace with your Formspree ID
                method="POST"
                className="bg-gray-50 p-8 rounded-lg shadow-lg"
              >
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">이름</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">연락처</label>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div className="mb-4">
                  <label htmlFor="address" className="block text-gray-700 font-semibold mb-2">주소 (시/구/동)</label>
                  <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">문의 내용</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={5} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required></textarea>
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300 text-lg">
                  견적 문의하기
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;