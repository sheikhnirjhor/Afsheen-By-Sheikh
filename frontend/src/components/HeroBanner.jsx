import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { HERO_BANNERS, SIDE_BANNERS } from '../data/products';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function HeroBanner() {
  const { setCurrentView } = useApp();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % HERO_BANNERS.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="max-w-[1200px] mx-auto px-4 mt-3">
      <div className="flex gap-2 h-[200px] sm:h-[280px] md:h-[340px]">
        {/* Main Slider */}
        <div className="flex-1 relative rounded overflow-hidden">
          {HERO_BANNERS.map((b, i) => (
            <div key={i} className={`absolute inset-0 transition-opacity duration-500 ${i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
              <img src={b.image} alt={b.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
              <div className="absolute inset-0 flex items-center px-8">
                <div>
                  <p className="text-[#F85606] text-[11px] font-bold tracking-[0.2em] mb-2">{b.subtitle}</p>
                  <h2 className="text-white text-[28px] font-bold leading-tight mb-2">{b.title}</h2>
                  <p className="text-white/80 text-[13px] mb-4 max-w-[360px]">{b.description}</p>
                  <button onClick={() => setCurrentView('shop')}
                    className="px-5 py-2 bg-[#F85606] text-white text-[12px] font-bold rounded hover:bg-[#E04D05] cursor-pointer">
                    {b.cta}
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button onClick={() => setCurrent(c => (c - 1 + HERO_BANNERS.length) % HERO_BANNERS.length)}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-black/30 rounded-full flex items-center justify-center text-white hover:bg-black/50 cursor-pointer">
            <ChevronLeft size={18} />
          </button>
          <button onClick={() => setCurrent(c => (c + 1) % HERO_BANNERS.length)}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-black/30 rounded-full flex items-center justify-center text-white hover:bg-black/50 cursor-pointer">
            <ChevronRight size={18} />
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
            {HERO_BANNERS.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${i === current ? 'w-6 bg-[#F85606]' : 'w-1.5 bg-white/50'}`} />
            ))}
          </div>
        </div>

        {/* Side Banners */}
        <div className="hidden md:flex flex-col gap-2 w-[240px]">
          {SIDE_BANNERS.map((b, i) => (
            <div key={i} className="flex-1 relative rounded overflow-hidden cursor-pointer" onClick={() => setCurrentView('shop')}>
              <img src={b.image} alt={b.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-white text-[14px] font-bold">{b.title}</p>
                <p className="text-white/80 text-[11px]">{b.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
