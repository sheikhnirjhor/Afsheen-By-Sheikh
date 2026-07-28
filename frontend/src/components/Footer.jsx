import { useApp } from '../context/AppContext';

export default function Footer() {
  const { setCurrentView } = useApp();
  return (
    <footer className="bg-white border-t border-gray-200 mt-4 pb-16 md:pb-0">
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          <div>
            <h4 className="text-[12px] font-bold text-[#222] mb-3">CUSTOMER CARE</h4>
            <ul className="space-y-1.5">
              {['Help Center', 'How to Buy', 'Returns & Refunds', 'Contact Us', 'Order Tracking'].map(t => (
                <li key={t}><button onClick={() => setCurrentView('contact')} className="text-[11px] text-[#666] hover:text-[#F85606] cursor-pointer">{t}</button></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[12px] font-bold text-[#222] mb-3">AFSHEEN</h4>
            <ul className="space-y-1.5">
              {['About Us', 'Careers', 'Privacy Policy', 'Terms & Conditions', 'Sell on Afsheen'].map(t => (
                <li key={t}><button onClick={() => setCurrentView('about')} className="text-[11px] text-[#666] hover:text-[#F85606] cursor-pointer">{t}</button></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[12px] font-bold text-[#222] mb-3">PAYMENT METHODS</h4>
            <div className="flex flex-wrap gap-2">
              {['bKash', 'Nagad', 'Visa', 'MC', 'COD'].map(p => (
                <span key={p} className="px-2 py-1 bg-gray-100 text-[10px] text-[#666] rounded font-medium">{p}</span>
              ))}
            </div>
            <h4 className="text-[12px] font-bold text-[#222] mt-4 mb-2">VERIFIED BY</h4>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-[#00B14F]/10 text-[10px] text-[#00B14F] rounded font-medium">SSL Commerz</span>
            </div>
          </div>
          <div>
            <h4 className="text-[12px] font-bold text-[#222] mb-3">FOLLOW US</h4>
            <div className="space-y-2">
              <a href="https://www.facebook.com/afsheenbysheikh" target="_blank" rel="noopener noreferrer"
                className="block text-[11px] text-[#666] hover:text-[#F85606]">Facebook (229K+ followers)</a>
              <a href="https://www.instagram.com/afsheenbysheikh" target="_blank" rel="noopener noreferrer"
                className="block text-[11px] text-[#666] hover:text-[#F85606]">Instagram</a>
              <a href="https://www.youtube.com/@AfsheenBySheikh" target="_blank" rel="noopener noreferrer"
                className="block text-[11px] text-[#666] hover:text-[#F85606]">YouTube</a>
            </div>
          </div>
          <div>
            <h4 className="text-[12px] font-bold text-[#222] mb-3">AFSHEEN APP</h4>
            <p className="text-[11px] text-[#666] mb-2">Download the app for the best experience</p>
            <div className="space-y-1.5">
              <div className="px-3 py-2 bg-[#222] text-white rounded text-[10px] font-medium cursor-pointer">▶ Google Play</div>
              <div className="px-3 py-2 bg-[#222] text-white rounded text-[10px] font-medium cursor-pointer"> App Store</div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 py-3 text-center">
        <p className="text-[10px] text-[#999]">© 2020–{new Date().getFullYear()} Afsheen Premium Fashion Hub. All Rights Reserved. | Proudly serving 229K+ Facebook family</p>
      </div>
    </footer>
  );
}
