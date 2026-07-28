import { useApp } from '../context/AppContext';
import { DEMO_USERS } from '../data/products';
import { ChevronRight } from 'lucide-react';

export default function LoginPage() {
  const { loginDirect, setCurrentView } = useApp();
  const demoLogin = (user) => {
    const s = loginDirect(user);
    if (s) setCurrentView(s.role === 'admin' ? 'admin-dashboard' : s.role === 'moderator' ? 'moderator-dashboard' : 'customer-dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center px-4 animate-fadeIn">
      <div className="w-full max-w-[400px]">
        <div className="bg-white rounded p-6 mb-4">
          <div className="text-center mb-5">
            <div className="w-12 h-12 bg-[#F85606] rounded-lg flex items-center justify-center mx-auto mb-3">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <h1 className="text-[18px] font-bold text-[#222]">Login to Afsheen</h1>
          </div>

          <div className="bg-[#FFF0E6] rounded p-4 mb-4">
            <p className="text-[11px] font-bold text-[#F85606] mb-2">QUICK DEMO ACCESS</p>
            <div className="space-y-2">
              {DEMO_USERS.map(user => (
                <button key={user.id} onClick={() => demoLogin(user)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 bg-white rounded border border-gray-100 hover:border-[#F85606] transition-colors cursor-pointer text-left">
                  <div className="w-8 h-8 bg-[#F85606] rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0">
                    {user.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-bold text-[#222]">{user.name}</p>
                    <p className="text-[10px] text-[#999] capitalize">{user.role}</p>
                  </div>
                  <ChevronRight size={14} className="text-[#ccc] shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-[12px] text-[#666]">
          Don't have an account?{' '}
          <button onClick={() => setCurrentView('register')} className="text-[#F85606] font-bold hover:underline cursor-pointer">Sign Up</button>
        </p>
      </div>
    </div>
  );
}
