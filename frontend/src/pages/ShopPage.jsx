import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { PRODUCTS, CATEGORIES } from '../data/products';

const SORT = [
  { value: 'popular', label: 'Popularity' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest' },
  { value: 'rating', label: 'Top Rated' },
];

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Free Size'];

export default function ShopPage() {
  const { setCurrentView } = useApp();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sort, setSort] = useState('popular');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [mobileFilter, setMobileFilter] = useState(false);

  let filtered = PRODUCTS;
  if (selectedCategory !== 'all') filtered = filtered.filter(p => p.category === selectedCategory);
  if (search.trim()) { const q = search.toLowerCase(); filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)); }
  if (inStockOnly) filtered = filtered.filter(p => p.inStock);
  filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
  if (selectedSizes.length > 0) filtered = filtered.filter(p => p.sizes?.some(s => selectedSizes.includes(s)));
  filtered = [...filtered].sort((a, b) => {
    switch (sort) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'newest': return b.id.localeCompare(a.id);
      default: return (b.sold || 0) - (a.sold || 0);
    }
  });

  const toggleSize = (s) => setSelectedSizes(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  const FilterSidebar = () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-[12px] font-bold text-[#222] mb-2">Categories</h3>
        <button onClick={() => setSelectedCategory('all')}
          className={`w-full text-left px-2 py-1.5 text-[12px] rounded cursor-pointer ${selectedCategory === 'all' ? 'text-[#F85606] font-bold' : 'text-[#666] hover:text-[#F85606]'}`}>
          All Categories
        </button>
        {CATEGORIES.map(c => (
          <button key={c.id} onClick={() => setSelectedCategory(c.name)}
            className={`w-full text-left px-2 py-1.5 text-[12px] rounded cursor-pointer flex items-center gap-1.5 ${selectedCategory === c.name ? 'text-[#F85606] font-bold' : 'text-[#666] hover:text-[#F85606]'}`}>
            <span>{c.icon}</span> {c.name}
          </button>
        ))}
      </div>
      <div>
        <h3 className="text-[12px] font-bold text-[#222] mb-2">Price Range</h3>
        <div className="flex gap-2 items-center">
          <input type="number" value={priceRange[0]} onChange={e => setPriceRange([Number(e.target.value), priceRange[1]])}
            className="w-full px-2 py-1.5 border border-gray-200 rounded text-[11px]" placeholder="Min" />
          <span className="text-[11px] text-[#999]">-</span>
          <input type="number" value={priceRange[1]} onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="w-full px-2 py-1.5 border border-gray-200 rounded text-[11px]" placeholder="Max" />
        </div>
      </div>
      <div>
        <h3 className="text-[12px] font-bold text-[#222] mb-2">Size</h3>
        <div className="flex flex-wrap gap-1.5">
          {SIZES.map(s => (
            <button key={s} onClick={() => toggleSize(s)}
              className={`px-2.5 py-1 border rounded text-[11px] cursor-pointer ${selectedSizes.includes(s) ? 'border-[#F85606] text-[#F85606] bg-[#F85606]/5' : 'border-gray-200 text-[#666]'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-[12px] font-bold text-[#222] mb-2">Availability</h3>
        <label className="flex items-center gap-2 text-[12px] text-[#666] cursor-pointer">
          <input type="checkbox" checked={inStockOnly} onChange={() => setInStockOnly(!inStockOnly)}
            className="accent-[#F85606] w-3.5 h-3.5" /> In Stock Only
        </label>
      </div>
    </div>
  );

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-3 animate-fadeIn">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1 text-[11px] text-[#999] mb-3">
        <button onClick={() => setCurrentView('home')} className="hover:text-[#F85606] cursor-pointer">Home</button>
        <span>/</span>
        <span className="text-[#222] font-medium">All Products ({filtered.length})</span>
      </div>

      {/* Search + Sort */}
      <div className="bg-white rounded p-3 mb-3 flex flex-col md:flex-row gap-2">
        <div className="flex-1 relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999]" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-2 border border-gray-200 rounded text-[12px]" placeholder="Search products..." />
        </div>
        <select value={sort} onChange={e => setSort(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded text-[12px] text-[#666]">
          {SORT.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <button onClick={() => setMobileFilter(!mobileFilter)}
          className="md:hidden px-3 py-2 bg-[#F85606] text-white text-[12px] font-bold rounded cursor-pointer">
          Filters
        </button>
      </div>

      <div className="flex gap-3">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-[220px] shrink-0 bg-white rounded p-3 h-fit">
          <FilterSidebar />
        </aside>

        {/* Mobile Filter */}
        {mobileFilter && (
          <div className="md:hidden fixed inset-0 z-50 bg-black/40" onClick={() => setMobileFilter(false)}>
            <div className="absolute left-0 top-0 bottom-0 w-72 bg-white p-4 overflow-y-auto animate-slideIn" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[13px] font-bold">Filters</h3>
                <button onClick={() => setMobileFilter(false)} className="text-[16px] cursor-pointer">✕</button>
              </div>
              <FilterSidebar />
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="flex-1 bg-white rounded p-3">
          <p className="text-[11px] text-[#999] mb-2">{filtered.length} product(s) found</p>
          {filtered.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-[14px] text-[#999]">No products found</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {filtered.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
