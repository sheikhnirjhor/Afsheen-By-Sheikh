import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/products';

export default function CategoryNav() {
  const { setCurrentView, megaMenuOpen, setMegaMenuOpen } = useApp();

  return (
    <nav className="bg-white border-b border-gray-200 relative z-40">
      <div className="max-w-[1200px] mx-auto px-4 flex items-center h-10 gap-0">
        {/* All Categories Mega Menu */}
        <div className="relative" onMouseEnter={() => setMegaMenuOpen(true)} onMouseLeave={() => setMegaMenuOpen(false)}>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#F85606] text-white text-[12px] font-bold rounded-l cursor-pointer whitespace-nowrap">
            ☰ All Categories
          </button>
          {megaMenuOpen && (
            <div className="absolute left-0 top-full w-64 bg-white border border-gray-200 shadow-lg z-50 animate-slideDown">
              <div className="py-2">
                {CATEGORIES.map(cat => (
                  <button key={cat.id} onClick={() => { setCurrentView('shop'); setMegaMenuOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] text-[#222] hover:bg-[#F85606]/5 hover:text-[#F85606] transition-colors cursor-pointer">
                    <span className="text-lg">{cat.icon}</span>
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Category Links */}
        <div className="flex items-center overflow-x-auto scrollbar-hide min-w-0">
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => setCurrentView('shop')}
              className="px-3 py-2 text-[12px] text-[#222] hover:text-[#F85606] whitespace-nowrap cursor-pointer font-medium transition-colors">
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
