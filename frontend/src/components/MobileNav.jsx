import { useApp } from '../context/AppContext';
import { Home, Grid3X3, ShoppingBag, Heart, User } from 'lucide-react';

export default function MobileNav() {
  const { currentView, setCurrentView, cart, session } = useApp();
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  const items = [
    { id: 'home', icon: <Home size={20} />, label: 'Home' },
    { id: 'shop', icon: <Grid3X3 size={20} />, label: 'Categories' },
    { id: 'cart', icon: <ShoppingBag size={20} />, label: 'Cart', badge: cartCount },
    { id: 'customer-dashboard', icon: <Heart size={20} />, label: 'Wishlist' },
    { id: session ? (session.role === 'admin' ? 'admin-dashboard' : session.role === 'moderator' ? 'moderator-dashboard' : 'customer-dashboard') : 'login', icon: <User size={20} />, label: 'Account' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex items-center justify-around h-14">
        {items.map(item => (
          <button key={item.label} onClick={() => setCurrentView(item.id)}
            className={`flex flex-col items-center justify-center flex-1 h-full cursor-pointer relative ${
              currentView === item.id ? 'text-[#F85606]' : 'text-[#666]'
            }`}>
            <div className="relative">
              {item.icon}
              {item.badge > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#F85606] text-white text-[9px] font-bold min-w-[14px] h-[14px] flex items-center justify-center rounded-full">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-0.5">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
