import React from 'react';

const ConstructionCases: React.FC = () => {
  const incheonImages = [
    'https://i.imgur.com/9Solzgp.jpg',
    'https://i.imgur.com/TFRBw14.jpg',
    'https://i.imgur.com/33NfzCx.jpg',
    'https://i.imgur.com/vHYcoaE.jpg',
    'https://i.imgur.com/JkQLqIt.jpg',
    'https://i.imgur.com/7bkcaRE.jpg',
    'https://i.imgur.com/CviXETW.jpg',
    'https://i.imgur.com/yrd5C2I.jpg',
    'https://i.imgur.com/RN6POxc.jpg',
    'https://i.imgur.com/edGOtov.jpg',
    'https://i.imgur.com/sqv6dBa.jpg',
    'https://i.imgur.com/DaQEwPF.jpg',
    'https://i.imgur.com/jgIwoD4.jpg',
    'https://i.imgur.com/6oqoOuH.jpg',
    'https://i.imgur.com/ClV5dCJ.jpg',
    'https://i.imgur.com/K3J4m0G.jpg',
    'https://i.imgur.com/YBVS5JO.jpg',
    'https://i.imgur.com/dTiHiOH.jpg',
    'https://i.imgur.com/RKEfDnC.jpg',
    'https://i.imgur.com/eVVnbDs.jpg',
    'https://i.imgur.com/DyB7J17.jpg',
    'https://i.imgur.com/UAGsIBp.jpg',
    'https://i.imgur.com/362bQw3.jpg',
    'https://i.imgur.com/IwSIsDA.jpg',
    'https://i.imgur.com/gbEGl1N.jpg',
    'https://i.imgur.com/mnJCMyS.jpg',
    'https://i.imgur.com/FjGDriy.jpg',
    'https://i.imgur.com/wiulcgj.jpg',
    'https://i.imgur.com/4XtN4CG.jpg',
    'https://i.imgur.com/OXIjZYa.jpg',
    'https://i.imgur.com/tm9iNCG.jpg',
    'https://i.imgur.com/vcjDgvL.jpg',
    'https://i.imgur.com/1Sq0rgX.jpg',
    'https://i.imgur.com/w7D8tsO.jpg',
    'https://i.imgur.com/ixa5gft.jpg',
    'https://i.imgur.com/yA8Hc8T.jpg',
    'https://i.imgur.com/vIAQisx.jpg',
    'https://i.imgur.com/4nYRvxr.jpg',
    'https://i.imgur.com/yTRBbW4.jpg',
    'https://i.imgur.com/Zb9XJR1.jpg',
    'https://i.imgur.com/jfclKwj.jpg',
    'https://i.imgur.com/5o8IikI.jpg',
    'https://i.imgur.com/IQB9bau.jpg',
    'https://i.imgur.com/5Ub5lQL.jpg',
    'https://i.imgur.com/FCVJimJ.jpg',
    'https://i.imgur.com/kCpsZQT.jpg',
    'https://i.imgur.com/Nwweyed.jpg',
    'https://i.imgur.com/Q2UeWkm.jpg',
    'https://i.imgur.com/lh5OeW7.jpg',
    'https://i.imgur.com/D5FQwVJ.jpg',
    'https://i.imgur.com/1xO7qHV.jpg',
    'https://i.imgur.com/AaItax9.jpg',
    'https://i.imgur.com/xI1qOr5.jpg',
    'https://i.imgur.com/fktDxHy.jpg',
    'https://i.imgur.com/tjYtoDB.jpg',
    'https://i.imgur.com/DITxO7o.jpg',
    'https://i.imgur.com/uH4gGjH.jpg',
    'https://i.imgur.com/QupBOyl.jpg',
    'https://i.imgur.com/7RpD3ZK.jpg',
    'https://i.imgur.com/g5NWWCX.jpg',
    'https://i.imgur.com/qPtLOrL.jpg',
    'https://i.imgur.com/7F7E1GB.jpg',
    'https://i.imgur.com/zNfHZAb.jpg',
    'https://i.imgur.com/9uxdZ7U.jpg',
    'https://i.imgur.com/K3vwHRE.jpg',
    'https://i.imgur.com/H6a9jQk.jpg',
    'https://i.imgur.com/QwA7d7e.jpg',
    'https://i.imgur.com/GyJkhZ6.jpg',
    'https://i.imgur.com/LcBAUSn.jpg',
    'https://i.imgur.com/36rzSOq.jpg',
    'https://i.imgur.com/IKy9FRG.jpg',
    'https://i.imgur.com/Itlnugb.jpg',
    'https://i.imgur.com/uJLO71O.jpg',
    'https://i.imgur.com/oTqlNvK.jpg',
    'https://i.imgur.com/Oc7xFDx.jpg',
    'https://i.imgur.com/CSfgDbo.jpg',
    'https://i.imgur.com/V8b1uyC.jpg',
    'https://i.imgur.com/GvcZ7RP.jpg',
    'https://i.imgur.com/LSYqrFA.jpg',
    'https://i.imgur.com/JSEwyeo.jpg',
    'https://i.imgur.com/wpmLbKZ.jpg',
    'https://i.imgur.com/gsTW4fF.jpg',
    'https://i.imgur.com/phqF7jS.jpg',
    'https://i.imgur.com/Is1voJU.jpg',
    'https://i.imgur.com/qFhhdIt.jpg',
    'https://i.imgur.com/iVVRVZ4.jpg',
    'https://i.imgur.com/fLg3gVn.jpg',
    'https://i.imgur.com/khpozA1.jpg',
    'https://i.imgur.com/i47P8z1.jpg',
    'https://i.imgur.com/7aAnFB5.jpg',
    'https://i.imgur.com/GxmzodL.jpg',
    'https://i.imgur.com/6aFpRi6.jpg',
    'https://i.imgur.com/soi3tND.jpg',
    'https://i.imgur.com/9bi4PgM.jpg',
    'https://i.imgur.com/yOtfmz8.jpg',
    'https://i.imgur.com/H1xUNgH.jpg',
    'https://i.imgur.com/rjN8CzF.jpg',
    'https://i.imgur.com/JEjJEWA.jpg',
    'https://i.imgur.com/TiXLsJm.jpg',
    'https://i.imgur.com/2Z7Q0Oa.jpg',
    'https://i.imgur.com/2Zin7uI.jpg',
    'https://i.imgur.com/jgHURDs.jpg',
    'https://i.imgur.com/gxwsuyf.jpg',
    'https://i.imgur.com/VRJ6rBu.jpg',
    'https://i.imgur.com/2tH28ua.jpg',
    'https://i.imgur.com/FUgcndb.jpg',
    'https://i.imgur.com/6p1Qlio.jpg',
    'https://i.imgur.com/0HsdSbw.jpg',
    'https://i.imgur.com/TM09t4b.jpg',
    'https://i.imgur.com/zzOTvzI.jpg',
    'https://i.imgur.com/rnmpa94.jpg',
    'https://i.imgur.com/b9wpXkR.jpg',
    'https://i.imgur.com/hvFOujT.jpg',
    'https://i.imgur.com/jttgLGG.jpg',
    'https://i.imgur.com/uBXPBWf.jpg',
    'https://i.imgur.com/A6VdonD.jpg',
  ];

  const gyeonggiImages = [
    'https://i.imgur.com/Bf8VPKt.jpg',
    'https://i.imgur.com/LoJSxu8.jpg',
    'https://i.imgur.com/dLaXhci.jpg',
    'https://i.imgur.com/pKUZCmY.jpg',
    'https://i.imgur.com/pGGPoub.jpg',
    'https://i.imgur.com/0GPBelR.jpg',
    'https://i.imgur.com/KNVp4uF.jpg',
    'https://i.imgur.com/8WSJXP2.jpg',
    'https://i.imgur.com/6PJwgUY.jpg',
    'https://i.imgur.com/cXtSrZF.jpg',
    'https://i.imgur.com/xr0sWKq.jpg',
    'https://i.imgur.com/QFBgHY1.jpg',
    'https://i.imgur.com/xG3VHlS.jpg',
    'https://i.imgur.com/neFAYJa.jpg',
    'https://i.imgur.com/kroUKuo.jpg',
    'https://i.imgur.com/kTtMV04.jpg',
    'https://i.imgur.com/IYQcRQL.jpg',
    'https://i.imgur.com/uAAIIIO.jpg',
    'https://i.imgur.com/XKs3DYw.jpg',
    'https://i.imgur.com/jGgKDGS.jpg',
    'https://i.imgur.com/9dfz3Fk.jpg',
    'https://i.imgur.com/i4BNSnD.jpg',
  ];

  const seoulImages = [
    'https://i.imgur.com/al1oZNA.jpg',
    'https://i.imgur.com/OlHQ2on.jpg',
    'https://i.imgur.com/wGSgFi7.jpg',
    'https://i.imgur.com/ZrE04q1.jpg',
    'https://i.imgur.com/wPLFCwm.jpg',
    'https://i.imgur.com/LyvDVzt.jpg',
    'https://i.imgur.com/HhYlNtk.jpg',
    'https://i.imgur.com/hwVHZUK.jpg',
    'https://i.imgur.com/AaQLEOJ.jpg',
    'https://i.imgur.com/Poa0qZM.jpg',
    'https://i.imgur.com/zLBVXtB.jpg',
    'https://i.imgur.com/RKEFLYH.jpg',
    'https://i.imgur.com/65e4ylT.jpg',
    'https://i.imgur.com/OKlnbBE.jpg',
  ];

  // Placeholder boxes for the marquee
  const placeholders = Array.from({ length: 10 }).map((_, i) => (
    <div key={i} className="flex-shrink-0 w-28 h-28 sm:w-64 sm:h-64 bg-gray-200 rounded-lg mx-1 sm:mx-2 flex items-center justify-center border border-gray-300">
      <span className="text-gray-400 text-[9px] sm:text-sm italic">이미지 준비 중</span>
    </div>
  ));

  const ImageItem = ({ src, alt }: { src: string; alt: string }) => (
    <div className="flex-shrink-0 w-28 h-28 sm:w-64 sm:h-64 bg-gray-100 rounded-lg mx-1 sm:mx-2 overflow-hidden border border-gray-200">
      <img src={src} alt={alt} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
    </div>
  );

  const MarqueeRow = ({ speedClass, items }: { speedClass: string; items: React.ReactNode[] }) => (
    <div className="overflow-hidden py-1 sm:py-2">
      <div className={speedClass}>
        {items}
        {items}
      </div>
    </div>
  );

  const gyeonggiRow1 = gyeonggiImages.slice(0, 11).map((src, i) => <ImageItem key={`gg1-${i}`} src={src} alt={`경기 시공사례 ${i + 1}`} />);
  const gyeonggiRow2 = gyeonggiImages.slice(11).map((src, i) => <ImageItem key={`gg2-${i}`} src={src} alt={`경기 시공사례 ${i + 12}`} />);

  const seoulRow1 = seoulImages.slice(0, 7).map((src, i) => <ImageItem key={`sl1-${i}`} src={src} alt={`서울 시공사례 ${i + 1}`} />);
  const seoulRow2 = seoulImages.slice(7).map((src, i) => <ImageItem key={`sl2-${i}`} src={src} alt={`서울 시공사례 ${i + 8}`} />);

  const incheonRow1 = incheonImages.slice(0, 38).map((src, i) => <ImageItem key={`ic1-${i}`} src={src} alt={`인천 시공사례 ${i + 1}`} />);
  const incheonRow2 = incheonImages.slice(38, 76).map((src, i) => <ImageItem key={`ic2-${i}`} src={src} alt={`인천 시공사례 ${i + 39}`} />);
  const incheonRow3 = incheonImages.slice(76).map((src, i) => <ImageItem key={`ic3-${i}`} src={src} alt={`인천 시공사례 ${i + 77}`} />);

  return (
    <section className="bg-white py-12 sm:py-16 overflow-hidden">
      <div className="container mx-auto px-4 mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-2">시공사례</h2>
        <div className="w-12 sm:w-16 h-1 bg-sky-500 mx-auto rounded-full"></div>
      </div>

      {/* 인천 지역 - 3줄 */}
      <div className="mb-12 sm:mb-16">
        <div className="container mx-auto px-4 mb-4 text-center">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-700 inline-block border-b-2 border-sky-500 pb-1 px-4">인천 지역</h3>
        </div>
        <div className="space-y-1 sm:space-y-2">
          <MarqueeRow speedClass="animate-marquee" items={incheonRow1} />
          <MarqueeRow speedClass="animate-marquee-slow" items={incheonRow2} />
          <MarqueeRow speedClass="animate-marquee-fast" items={incheonRow3} />
        </div>
      </div>

      {/* 경기 지역 - 2줄 */}
      <div className="mb-12 sm:mb-16">
        <div className="container mx-auto px-4 mb-4 text-center">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-700 inline-block border-b-2 border-emerald-500 pb-1 px-4">경기 지역</h3>
        </div>
        <div className="space-y-1 sm:space-y-2">
          <MarqueeRow speedClass="animate-marquee-slow" items={gyeonggiRow1} />
          <MarqueeRow speedClass="animate-marquee" items={gyeonggiRow2} />
        </div>
      </div>

      {/* 서울 지역 - 2줄 */}
      <div className="mb-8">
        <div className="container mx-auto px-4 mb-4 text-center">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-700 inline-block border-b-2 border-amber-500 pb-1 px-4">서울 지역</h3>
        </div>
        <div className="space-y-1 sm:space-y-2">
          <MarqueeRow speedClass="animate-marquee" items={seoulRow1} />
          <MarqueeRow speedClass="animate-marquee-slow" items={seoulRow2} />
        </div>
      </div>
    </section>
  );
};

export default ConstructionCases;
