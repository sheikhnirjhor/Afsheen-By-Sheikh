import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/products';

export default function CategoryIcons() {
  const { setCurrentView } = useApp();
  return (
    <div className="max-w-[1200px] mx-auto px-4 mt-4">
      <div className="bg-white rounded p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[14px] font-bold text-[#222]">Categories</h2>
          <button onClick={() => setCurrentView('shop')} className="text-[12px] text-[#F85606] font-bold hover:underline cursor-pointer">
            SEE ALL →
          </button>
        </div>
        <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => setCurrentView('shop')}
              className="flex flex-col items-center gap-1.5 cursor-pointer group">
              <div className="w-12 h-12 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-2xl group-hover:border-[#F85606] transition-colors">
                {cat.icon}
              </div>
              <span className="text-[10px] text-[#666] text-center leading-tight group-hover:text-[#F85606]">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
