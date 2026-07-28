import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Heart, ShoppingBag, User, ChevronDown } from 'lucide-react';

export default function Header() {
  const { cart, currentView, setCurrentView, session, logout } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [accountOpen, setAccountOpen] = useState(false);
  const [cartHover, setCartHover] = useState(false);
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) setCurrentView('shop');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-[1200px] mx-auto px-4 flex items-center gap-6 h-16">
        {/* Logo */}
        <button onClick={() => setCurrentView('home')} className="shrink-0 cursor-pointer">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#F85606] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <div className="hidden sm:block leading-tight">
              <p className="text-[15px] font-bold text-[#222]">Afsheen</p>
              <p className="text-[10px] text-[#F85606] font-medium tracking-wider">PREMIUM FASHION</p>
            </div>
          </div>
        </button>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 flex max-w-[600px]">
          <input
            type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search in Afsheen"
            className="flex-1 px-4 py-2.5 border-2 border-[#F85606] border-r-0 rounded-l-sm text-[13px] placeholder:text-[#999]"
          />
          <button type="submit" className="px-5 bg-[#F85606] text-white rounded-r-sm hover:bg-[#E04D05] transition-colors cursor-pointer">
            <Search size={18} />
          </button>
        </form>

        {/* Right Icons */}
        <div className="flex items-center gap-1">
          {/* Wishlist */}
          <button onClick={() => session ? setCurrentView('customer-dashboard') : setCurrentView('login')}
            className="p-2 hover:bg-gray-100 rounded cursor-pointer relative">
            <Heart size={22} className="text-[#666]" />
          </button>

          {/* Cart */}
          <div className="relative" onMouseEnter={() => setCartHover(true)} onMouseLeave={() => setCartHover(false)}>
            <button onClick={() => setCurrentView('cart')} className="p-2 hover:bg-gray-100 rounded cursor-pointer relative">
              <ShoppingBag size={22} className="text-[#666]" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#F85606] text-white text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            {cartHover && cart.length > 0 && (
              <div className="absolute right-0 top-full w-80 bg-white border border-gray-200 shadow-lg rounded z-50 animate-slideDown">
                <div className="p-4">
                  <p className="text-[12px] text-[#666] mb-3">{cartCount} item(s) in cart</p>
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {cart.slice(0, 4).map((item, idx) => (
                      <div key={idx} className="flex gap-3">
                        <img src={item.product.image} alt="" className="w-12 h-12 rounded object-cover" />
                        <div className="flex-1 min-w-0">
                          <p className="text-[12px] text-[#222] line-clamp-2">{item.product.name}</p>
                          <p className="text-[12px] text-[#F85606] font-bold mt-1">৳{item.product.price.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t mt-3 pt-3 flex justify-between">
                    <span className="text-[13px] font-bold">Subtotal:</span>
                    <span className="text-[13px] font-bold text-[#F85606]">৳{cartTotal.toLocaleString()}</span>
                  </div>
                  <button onClick={() => { setCurrentView('cart'); setCartHover(false); }}
                    className="w-full mt-3 py-2 bg-[#F85606] text-white text-[13px] font-bold rounded hover:bg-[#E04D05] cursor-pointer">
                    VIEW CART
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Account */}
          <div className="relative" onMouseEnter={() => setAccountOpen(true)} onMouseLeave={() => setAccountOpen(false)}>
            <button className="flex items-center gap-1 p-2 hover:bg-gray-100 rounded cursor-pointer">
              <User size={22} className="text-[#666]" />
              <ChevronDown size={14} className="text-[#666]" />
            </button>
            {accountOpen && (
              <div className="absolute right-0 top-full w-52 bg-white border border-gray-200 shadow-lg rounded z-50 animate-slideDown">
                <div className="py-2">
                  {session ? (
                    <>
                      <div className="px-4 py-2 border-b">
                        <p className="text-[13px] font-bold text-[#222]">{session.name}</p>
                        <p className="text-[11px] text-[#666]">{session.email}</p>
                      </div>
                      <button onClick={() => { setCurrentView(session.role === 'admin' ? 'admin-dashboard' : session.role === 'moderator' ? 'moderator-dashboard' : 'customer-dashboard'); setAccountOpen(false); }}
                        className="w-full text-left px-4 py-2 text-[13px] text-[#222] hover:bg-gray-50 cursor-pointer">
                        My Account
                      </button>
                      <button onClick={() => { logout(); setAccountOpen(false); }}
                        className="w-full text-left px-4 py-2 text-[13px] text-red-500 hover:bg-gray-50 cursor-pointer">
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => { setCurrentView('login'); setAccountOpen(false); }}
                        className="w-full text-left px-4 py-2 text-[13px] text-[#222] hover:bg-gray-50 cursor-pointer">
                        Login
                      </button>
                      <button onClick={() => { setCurrentView('register'); setAccountOpen(false); }}
                        className="w-full text-left px-4 py-2 text-[13px] text-[#222] hover:bg-gray-50 cursor-pointer">
                        Sign Up
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
