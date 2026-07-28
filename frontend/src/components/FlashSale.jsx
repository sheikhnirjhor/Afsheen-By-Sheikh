import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/products';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';

export default function FlashSale() {
  const { setSelectedProduct, setCurrentView, addToCart, flashSaleEnd } = useApp();
  const [timeLeft, setTimeLeft] = useState({ h: 6, m: 0, s: 0 });
  const scrollRef = { current: null };

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, flashSaleEnd - Date.now());
      setTimeLeft({ h: Math.floor(diff / 3600000), m: Math.floor((diff % 3600000) / 60000), s: Math.floor((diff % 60000) / 1000) });
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [flashSaleEnd]);

  const flashProducts = PRODUCTS.filter(p => p.originalPrice && p.originalPrice > p.price).slice(0, 10);

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div className="max-w-[1200px] mx-auto px-4 mt-4">
      <div className="bg-white rounded overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#FFF0E6] border-b border-[#F85606]/20">
          <div className="flex items-center gap-3">
            <span className="text-[16px] font-bold text-[#F85606]">⚡ Flash Sale</span>
            <div className="flex items-center gap-1 text-[12px] text-[#222]">
              <Clock size={14} className="text-[#E64545]" />
              <span>Ends in:</span>
              <span className="bg-[#222] text-white px-1.5 py-0.5 rounded text-[11px] font-bold font-mono">{pad(timeLeft.h)}</span>
              <span className="text-[#222] font-bold">:</span>
              <span className="bg-[#222] text-white px-1.5 py-0.5 rounded text-[11px] font-bold font-mono">{pad(timeLeft.m)}</span>
              <span className="text-[#222] font-bold">:</span>
              <span className="bg-[#222] text-white px-1.5 py-0.5 rounded text-[11px] font-bold font-mono">{pad(timeLeft.s)}</span>
            </div>
          </div>
          <button onClick={() => setCurrentView('shop')} className="text-[12px] text-[#F85606] font-bold hover:underline cursor-pointer">
            VIEW ALL →
          </button>
        </div>

        {/* Products Scroll */}
        <div className="relative">
          <div ref={scrollRef} className="flex gap-0 overflow-x-auto scrollbar-hide px-2 py-3">
            {flashProducts.map(product => {
              const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
              return (
                <div key={product.id} className="shrink-0 w-[180px] px-2 cursor-pointer group"
                  onClick={() => { setSelectedProduct(product.id); setCurrentView('product-details'); }}>
                  <div className="relative aspect-square bg-gray-50 rounded overflow-hidden mb-2">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <span className="absolute top-1 left-1 bg-[#E64545] text-white text-[10px] font-bold px-1 py-0.5 rounded">-{discount}%</span>
                  </div>
                  <p className="text-[13px] font-bold text-[#F85606]">৳{product.price.toLocaleString()}</p>
                  <p className="text-[11px] text-[#999] line-through">৳{product.originalPrice.toLocaleString()}</p>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1.5">
                    <div className="bg-[#F85606] h-1.5 rounded-full" style={{ width: `${Math.min(100, (product.sold || 50) / 10)}%` }} />
                  </div>
                  <p className="text-[10px] text-[#999] mt-0.5">{product.sold || Math.floor(Math.random() * 500 + 100)} sold</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
