import { useApp } from '../context/AppContext';

export default function TopBar() {
  const { session, setCurrentView } = useApp();
  return (
    <div className="bg-[#F85606] text-white text-[12px]">
      <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-between h-8">
        <div className="flex items-center gap-4">
          <button onClick={() => setCurrentView('shop')} className="hover:underline cursor-pointer">Sell on Afsheen</button>
          <span className="text-white/40">|</span>
          <button onClick={() => setCurrentView('contact')} className="hover:underline cursor-pointer">Customer Care</button>
          <span className="text-white/40">|</span>
          <button onClick={() => session ? setCurrentView('customer-dashboard') : setCurrentView('login')} className="hover:underline cursor-pointer">Order Tracking</button>
        </div>
        <div className="flex items-center gap-4">
          {session ? (
            <button onClick={() => setCurrentView(session.role === 'admin' ? 'admin-dashboard' : session.role === 'moderator' ? 'moderator-dashboard' : 'customer-dashboard')} className="hover:underline cursor-pointer">
              Hi, {session.name.split(' ')[0]}
            </button>
          ) : (
            <>
              <button onClick={() => setCurrentView('login')} className="hover:underline cursor-pointer">Login</button>
              <span className="text-white/40">|</span>
              <button onClick={() => setCurrentView('register')} className="hover:underline cursor-pointer">Sign Up</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
