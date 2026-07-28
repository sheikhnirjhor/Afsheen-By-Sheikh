import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { STORE_LOCATIONS } from '../data/products';

export default function ContactPage() {
  const { notify } = useApp();
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: 'general', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    notify('Message sent! We respond within 24 hours.');
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ name: '', email: '', phone: '', subject: 'general', message: '' });
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-3 animate-fadeIn">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-3">
        <div className="bg-white rounded p-5">
          <h1 className="text-[18px] font-bold text-[#222] mb-3">Contact Us</h1>
          {submitted ? (
            <div className="py-12 text-center">
              <p className="text-[32px] mb-2">✅</p>
              <p className="text-[14px] font-bold text-[#222]">Message Sent!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                  className="px-3 py-2.5 border border-gray-200 rounded text-[12px]" placeholder="Name *" />
                <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                  className="px-3 py-2.5 border border-gray-200 rounded text-[12px]" placeholder="Email *" />
                <input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                  className="px-3 py-2.5 border border-gray-200 rounded text-[12px]" placeholder="Phone" />
                <select value={form.subject} onChange={e => setForm({...form, subject: e.target.value})}
                  className="px-3 py-2.5 border border-gray-200 rounded text-[12px]">
                  <option value="general">General Inquiry</option>
                  <option value="order">Order Support</option>
                  <option value="return">Return/Exchange</option>
                </select>
              </div>
              <textarea required value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                className="w-full px-3 py-2.5 border border-gray-200 rounded text-[12px] h-24 resize-none" placeholder="Message *" />
              <button type="submit" className="px-6 py-2.5 bg-[#F85606] text-white text-[12px] font-bold rounded hover:bg-[#E04D05] cursor-pointer">Send Message</button>
            </form>
          )}
        </div>

        <div className="space-y-3">
          <div className="bg-white rounded p-4">
            <h3 className="text-[13px] font-bold text-[#222] mb-2">Contact Info</h3>
            <div className="space-y-2 text-[11px] text-[#666]">
              <p>📞 +880 1712-345678</p>
              <p>📧 info@afsheenbysheikh.com</p>
              <p>📍 Dhanmondi, Dhaka 1205</p>
              <p>🕐 Sat-Thu: 10AM - 9PM</p>
            </div>
          </div>
          <div className="bg-white rounded p-4">
            <h3 className="text-[13px] font-bold text-[#222] mb-2">Follow Us</h3>
            <div className="flex gap-2">
              <a href="https://www.facebook.com/afsheenbysheikh" target="_blank" rel="noopener noreferrer"
                className="px-3 py-1.5 bg-[#1877F2] text-white text-[11px] font-bold rounded cursor-pointer">Facebook</a>
              <a href="https://www.instagram.com/afsheenbysheikh" target="_blank" rel="noopener noreferrer"
                className="px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[11px] font-bold rounded cursor-pointer">Instagram</a>
            </div>
          </div>
          {STORE_LOCATIONS.slice(0, 1).map((loc, i) => (
            <div key={i} className="bg-white rounded p-4">
              <h3 className="text-[13px] font-bold text-[#222] mb-1">{loc.name}</h3>
              <p className="text-[11px] text-[#666]">{loc.address}</p>
              <p className="text-[11px] text-[#999] mt-1">{loc.hours}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
