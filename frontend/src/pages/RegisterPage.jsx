import { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function RegisterPage() {
  const { register, setCurrentView } = useApp();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPass: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPass) { setError('Passwords do not match'); return; }
    if (form.password.length < 6) { setError('Min. 6 characters'); return; }
    const s = register({ name: form.name, email: form.email, phone: form.phone, password: form.password });
    if (s) setCurrentView('customer-dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center px-4 animate-fadeIn">
      <div className="w-full max-w-[400px]">
        <div className="bg-white rounded p-6">
          <div className="text-center mb-5">
            <div className="w-12 h-12 bg-[#F85606] rounded-lg flex items-center justify-center mx-auto mb-3">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <h1 className="text-[18px] font-bold text-[#222]">Create Account</h1>
          </div>
          <form onSubmit={handleSubmit} className="space-y-3">
            {error && <p className="text-[11px] text-[#E64545] bg-red-50 px-3 py-2 rounded">{error}</p>}
            <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})}
              className="w-full px-3 py-2.5 border border-gray-200 rounded text-[12px]" placeholder="Full Name" />
            <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})}
              className="w-full px-3 py-2.5 border border-gray-200 rounded text-[12px]" placeholder="Email" />
            <input type="tel" required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
              className="w-full px-3 py-2.5 border border-gray-200 rounded text-[12px]" placeholder="Phone" />
            <input type="password" required value={form.password} onChange={e => setForm({...form, password: e.target.value})}
              className="w-full px-3 py-2.5 border border-gray-200 rounded text-[12px]" placeholder="Password (min. 6)" />
            <input type="password" required value={form.confirmPass} onChange={e => setForm({...form, confirmPass: e.target.value})}
              className="w-full px-3 py-2.5 border border-gray-200 rounded text-[12px]" placeholder="Confirm Password" />
            <button type="submit" className="w-full py-2.5 bg-[#F85606] text-white text-[13px] font-bold rounded hover:bg-[#E04D05] cursor-pointer">
              SIGN UP
            </button>
          </form>
        </div>
        <p className="text-center text-[12px] text-[#666] mt-3">
          Already have an account? <button onClick={() => setCurrentView('login')} className="text-[#F85606] font-bold hover:underline cursor-pointer">Login</button>
        </p>
      </div>
    </div>
  );
}
