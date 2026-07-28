import { ShoppingBag, User, Search, Menu, X, LayoutDashboard, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function Navbar() {
  const { cart, currentView, setCurrentView, session, logout } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const roleDashboard = session?.role === 'admin' ? 'admin-dashboard'
    : session?.role === 'moderator' ? 'moderator-dashboard' : 'customer-dashboard';

  const roleLabel = session?.role === 'admin' ? 'Admin Panel'
    : session?.role === 'moderator' ? 'Moderator Panel' : 'My Account';

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setCurrentView('shop');
      setShowSearch(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-neutral-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          <button onClick={() => setCurrentView('home')} className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#c9a96e] to-[#a17c4e] flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-[15px] font-bold text-neutral-900 leading-tight tracking-tight">Afsheen</p>
              <p className="text-[10px] text-[#c9a96e] font-medium tracking-[0.2em] uppercase leading-tight">Premium Fashion</p>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map(item => (
              <button key={item.id} onClick={() => setCurrentView(item.id)}
                className={`text-[15px] font-medium transition-colors ${
                  currentView === item.id ? 'text-[#c9a96e]' : 'text-neutral-600 hover:text-neutral-900'
                }`}>
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button onClick={() => setShowSearch(!showSearch)}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-100 text-neutral-600 transition-colors">
              {showSearch ? <X size={20} /> : <Search size={20} />}
            </button>

            <button onClick={() => setCurrentView('cart')}
              className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-100 text-neutral-600 transition-colors">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#c9a96e] text-white text-[11px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            <div className="relative">
              <button onClick={() => session ? setProfileOpen(!profileOpen) : setCurrentView('login')}
                className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-neutral-100 transition-colors">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#c9a96e] to-[#a17c4e] flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
                {session && <span className="hidden lg:block text-[14px] font-medium text-neutral-700">{session.name.split(' ')[0]}</span>}
              </button>

              {profileOpen && session && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-neutral-200 py-2 z-50 animate-slideDown">
                    <div className="px-4 py-3 border-b border-neutral-100">
                      <p className="text-[14px] font-semibold text-neutral-900">{session.name}</p>
                      <p className="text-[13px] text-neutral-500 capitalize">{session.role}</p>
                    </div>
                    <button onClick={() => { setCurrentView(roleDashboard); setProfileOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-[14px] text-neutral-700 hover:bg-neutral-50">
                      <LayoutDashboard size={16} /> {roleLabel}
                    </button>
                    <button onClick={() => { setProfileOpen(false); logout(); }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-[14px] text-red-600 hover:bg-red-50">
                      <LogOut size={16} /> Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>

            <button onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-100 text-neutral-600">
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {showSearch && (
          <div className="pb-4 animate-slideDown">
            <div className="flex gap-2">
              <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
                placeholder="Search dresses, sarees, jewellery..."
                className="flex-1 px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-[15px] placeholder:text-neutral-400" autoFocus />
              <button onClick={handleSearch}
                className="px-6 py-3 bg-[#c9a96e] text-white rounded-xl text-[14px] font-semibold hover:bg-[#a17c4e] transition-colors">
                Search
              </button>
            </div>
          </div>
        )}

        {mobileOpen && (
          <div className="md:hidden border-t border-neutral-100 py-4 animate-slideDown">
            <div className="flex flex-col gap-1">
              {navItems.map(item => (
                <button key={item.id} onClick={() => { setCurrentView(item.id); setMobileOpen(false); }}
                  className={`text-left px-4 py-3 rounded-xl text-[15px] font-medium transition-colors ${
                    currentView === item.id ? 'bg-[#c9a96e]/10 text-[#c9a96e]' : 'text-neutral-600 hover:bg-neutral-50'
                  }`}>
                  {item.label}
                </button>
              ))}
              {session && (
                <button onClick={() => { setCurrentView(roleDashboard); setMobileOpen(false); }}
                  className="text-left px-4 py-3 rounded-xl text-[15px] font-medium text-neutral-600 hover:bg-neutral-50">
                  {roleLabel}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
