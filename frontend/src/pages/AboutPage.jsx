import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TESTIMONIALS, FAQS, STORE_LOCATIONS } from '../data/products';
import ReviewCard from '../components/ReviewCard';

export default function AboutPage() {
  const { setCurrentView } = useApp();
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-3 animate-fadeIn">
      <div className="bg-white rounded p-5 mb-3">
        <h1 className="text-[20px] font-bold text-[#222] mb-2">About Afsheen Premium Fashion Hub</h1>
        <p className="text-[12px] text-[#666] leading-relaxed mb-3">
          Established in 2020, Afsheen has grown from a small boutique in Dhanmondi, Dhaka to one of South Asia's most trusted online fashion destinations. With 229K+ Facebook followers, we've built a family that celebrates beauty, tradition, and self-expression.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {[{ n: '229K+', l: 'Facebook Followers' }, { n: '50K+', l: 'Happy Customers' }, { n: '500+', l: 'Products' }, { n: '5+', l: 'Years' }].map((s, i) => (
            <div key={i} className="bg-[#FFF0E6] rounded p-3 text-center">
              <p className="text-[18px] font-bold text-[#F85606]">{s.n}</p>
              <p className="text-[10px] text-[#666]">{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded p-5 mb-3">
        <h2 className="text-[14px] font-bold text-[#222] mb-3">Store Locations</h2>
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

      <div className="bg-white rounded p-5 mb-3">
        <h2 className="text-[14px] font-bold text-[#222] mb-3">Customer Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {TESTIMONIALS.slice(0, 6).map((r, i) => <ReviewCard key={i} review={r} />)}
        </div>
      </div>

      <div className="bg-white rounded p-5">
        <h2 className="text-[14px] font-bold text-[#222] mb-3">FAQ</h2>
        <div className="space-y-1.5">
          {FAQS.map((faq, i) => (
            <div key={i} className="border border-gray-100 rounded">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-3 py-2.5 text-left cursor-pointer">
                <span className="text-[12px] font-medium text-[#222]">{faq.q}</span>
                <span className={`text-[14px] text-[#999] transition-transform ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
              </button>
              {openFaq === i && <div className="px-3 pb-2.5 animate-slideDown"><p className="text-[11px] text-[#666] leading-relaxed">{faq.a}</p></div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
