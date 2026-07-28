import { useState } from 'react';
import { useApp } from '../context/AppContext';
import HeroBanner from '../components/HeroBanner';
import FlashSale from '../components/FlashSale';
import CategoryIcons from '../components/CategoryIcons';
import ProductCard from '../components/ProductCard';
import ReviewCard from '../components/ReviewCard';
import { PRODUCTS, TESTIMONIALS, FAQS, STORE_LOCATIONS } from '../data/products';

export default function HomePage() {
  const { setCurrentView } = useApp();
  const [openFaq, setOpenFaq] = useState(null);
  const trending = PRODUCTS.filter(p => p.trending).slice(0, 6);
  const newArrivals = PRODUCTS.slice(0, 6);

  return (
    <div className="animate-fadeIn pb-4 md:pb-0">
      <HeroBanner />
      <FlashSale />
      <CategoryIcons />

      {/* Trending Now */}
      <div className="max-w-[1200px] mx-auto px-4 mt-4">
        <div className="bg-white rounded p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[14px] font-bold text-[#222]">🔥 Trending Now</h2>
            <button onClick={() => setCurrentView('shop')} className="text-[12px] text-[#F85606] font-bold hover:underline cursor-pointer">VIEW ALL →</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {trending.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </div>

      {/* Just For You */}
      <div className="max-w-[1200px] mx-auto px-4 mt-4">
        <div className="bg-white rounded p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[14px] font-bold text-[#222]">✨ Just For You</h2>
            <button onClick={() => setCurrentView('shop')} className="text-[12px] text-[#F85606] font-bold hover:underline cursor-pointer">VIEW ALL →</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {newArrivals.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </div>

      {/* Heritage Banner */}
      <div className="max-w-[1200px] mx-auto px-4 mt-4">
        <div className="bg-[#F85606] rounded p-6 flex items-center justify-between cursor-pointer" onClick={() => setCurrentView('about')}>
          <div>
            <p className="text-white/80 text-[11px] font-bold tracking-wider mb-1">OUR STORY</p>
            <h2 className="text-white text-[20px] font-bold mb-1">Afsheen Premium Fashion Hub</h2>
            <p className="text-white/80 text-[12px]">Since 2020 | 229K+ Facebook Family | Dhaka, Bangladesh</p>
          </div>
          <span className="text-white text-[28px]">✨</span>
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-[1200px] mx-auto px-4 mt-4">
        <div className="bg-white rounded p-4">
          <h2 className="text-[14px] font-bold text-[#222] mb-3">⭐ Customer Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {TESTIMONIALS.slice(0, 3).map((r, i) => <ReviewCard key={i} review={r} />)}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-[1200px] mx-auto px-4 mt-4">
        <div className="bg-white rounded p-4">
          <h2 className="text-[14px] font-bold text-[#222] mb-3">❓ Frequently Asked Questions</h2>
          <div className="space-y-1.5">
            {FAQS.map((faq, i) => (
              <div key={i} className="border border-gray-100 rounded">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-3 py-2.5 text-left cursor-pointer">
                  <span className="text-[12px] font-medium text-[#222]">{faq.q}</span>
                  <span className={`text-[14px] text-[#999] transition-transform ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                {openFaq === i && (
                  <div className="px-3 pb-2.5 animate-slideDown">
                    <p className="text-[11px] text-[#666] leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Store Locations */}
      <div className="max-w-[1200px] mx-auto px-4 mt-4">
        <div className="bg-white rounded p-4">
          <h2 className="text-[14px] font-bold text-[#222] mb-3">📍 Store Locations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {STORE_LOCATIONS.map((loc, i) => (
              <div key={i} className="border border-gray-100 rounded p-3">
                <h3 className="text-[12px] font-bold text-[#222] mb-1">{loc.name}</h3>
                <p className="text-[11px] text-[#666] mb-1">{loc.address}</p>
                <p className="text-[11px] text-[#999]">{loc.hours}</p>
                <p className="text-[11px] text-[#F85606] font-medium mt-1">{loc.phone}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


//updated