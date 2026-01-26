
import React from 'react';

const Gallery: React.FC = () => {
  const images = Array.from({ length: 8 }, (_, i) => `https://picsum.photos/500/500?random=${i + 10}`);

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">꼼꼼한 시공 사례</h2>
          <p className="text-lg text-gray-600 mt-4">사진으로 직접 확인하시는 우리의 기술력입니다.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((src, index) => (
            <div key={index} className="overflow-hidden rounded-lg shadow-md group">
              <img 
                src={src} 
                alt={`시공 사례 ${index + 1}`} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
