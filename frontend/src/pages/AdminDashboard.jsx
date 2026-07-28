import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Package, ShoppingBag, Users, TrendingUp, Plus, Edit3, Trash2, Save } from 'lucide-react';

export default function AdminDashboard() {
  const { products, addProduct, updateProduct, deleteProduct, users, orders, updateOrderStatus, coupons, addCoupon, session, setCurrentView } = useApp();
  const [tab, setTab] = useState('overview');
  const [editProd, setEditProd] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [np, setNp] = useState({ name: '', price: '', originalPrice: '', category: 'Bridal Outfit', description: '', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400', inStock: true, trending: false, freeDelivery: true, sizes: ['S', 'M', 'L'] });

  const stats = { revenue: orders.reduce((s, o) => s + (o.total || 0), 0), orders: orders.length, products: products.length, users: users.length };
  const tabs = [
    { id: 'overview', label: 'Overview' }, { id: 'products', label: 'Products' },
    { id: 'orders', label: 'Orders' }, { id: 'users', label: 'Users' }, { id: 'coupons', label: 'Coupons' },
  ];

  const handleAdd = () => { addProduct({ ...np, price: Number(np.price), originalPrice: Number(np.originalPrice) || Number(np.price) }); setShowAdd(false); };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="bg-[#222] text-white px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#F85606] rounded flex items-center justify-center font-bold text-[14px]">A</div>
          <span className="text-[14px] font-bold">Admin Dashboard</span>
        </div>
        <button onClick={() => setCurrentView('home')} className="text-[11px] text-gray-400 hover:text-white cursor-pointer">← Back to Store</button>
      </div>
      <div className="max-w-[1200px] mx-auto px-4 py-4">
        <div className="flex gap-1 mb-4 overflow-x-auto">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2 text-[12px] font-bold rounded whitespace-nowrap cursor-pointer ${tab === t.id ? 'bg-[#F85606] text-white' : 'bg-white text-[#666]'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'overview' && (
          <div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              {[{ l: 'Revenue', v: `৳${stats.revenue.toLocaleString()}`, c: 'text-[#00B14F]' }, { l: 'Orders', v: stats.orders, c: 'text-[#F85606]' }, { l: 'Products', v: stats.products, c: 'text-[#7B61FF]' }, { l: 'Users', v: stats.users, c: 'text-[#E64545]' }].map((s, i) => (
                <div key={i} className="bg-white rounded p-4">
                  <p className="text-[11px] text-[#999]">{s.l}</p>
                  <p className={`text-[20px] font-bold ${s.c}`}>{s.v}</p>
                </div>
              ))}
            </div>
            <div className="bg-white rounded p-4">
              <h3 className="text-[13px] font-bold text-[#222] mb-3">Recent Orders</h3>
              {orders.length === 0 ? <p className="text-[12px] text-[#999]">No orders yet</p> :
                orders.slice(0, 5).map(o => (
                  <div key={o.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div><p className="text-[12px] font-bold text-[#222]">#{o.id.slice(-6)}</p><p className="text-[10px] text-[#999]">{o.customerName}</p></div>
                    <div className="text-right"><p className="text-[12px] font-bold">৳{(o.total || 0).toLocaleString()}</p>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded ${o.status === 'Delivered' ? 'bg-green-50 text-[#00B14F]' : 'bg-yellow-50 text-[#F85606]'}`}>{o.status}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {tab === 'products' && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-[12px] text-[#666]">{products.length} products</p>
              <button onClick={() => setShowAdd(!showAdd)} className="px-3 py-1.5 bg-[#F85606] text-white text-[11px] font-bold rounded cursor-pointer flex items-center gap-1"><Plus size={12} /> Add</button>
            </div>
            {showAdd && (
              <div className="bg-white rounded p-3 mb-3 animate-slideDown">
                <div className="grid grid-cols-2 gap-2">
                  <input placeholder="Name" value={np.name} onChange={e => setNp({...np, name: e.target.value})} className="px-2.5 py-2 border border-gray-200 rounded text-[11px]" />
                  <select value={np.category} onChange={e => setNp({...np, category: e.target.value})} className="px-2.5 py-2 border border-gray-200 rounded text-[11px]">
                    {['Bridal Outfit', 'Bengali Couple Set', 'Bengali Family Combo', 'Gown', 'Saree', 'Lehenga', 'Indian Party Dress', 'Pakistani Luxury Collection', 'Imported Skincare Products', 'Jewellery & Trending Accessories'].map(c => <option key={c}>{c}</option>)}
                  </select>
                  <input type="number" placeholder="Price" value={np.price} onChange={e => setNp({...np, price: e.target.value})} className="px-2.5 py-2 border border-gray-200 rounded text-[11px]" />
                  <input type="number" placeholder="Original Price" value={np.originalPrice} onChange={e => setNp({...np, originalPrice: e.target.value})} className="px-2.5 py-2 border border-gray-200 rounded text-[11px]" />
                  <input placeholder="Image URL" value={np.image} onChange={e => setNp({...np, image: e.target.value})} className="col-span-2 px-2.5 py-2 border border-gray-200 rounded text-[11px]" />
                  <textarea placeholder="Description" value={np.description} onChange={e => setNp({...np, description: e.target.value})} className="col-span-2 px-2.5 py-2 border border-gray-200 rounded text-[11px] h-16 resize-none" />
                </div>
                <div className="flex gap-2 mt-2">
                  <button onClick={handleAdd} className="px-3 py-1.5 bg-[#F85606] text-white text-[11px] font-bold rounded cursor-pointer">Save</button>
                  <button onClick={() => setShowAdd(false)} className="px-3 py-1.5 bg-gray-100 text-[11px] rounded cursor-pointer">Cancel</button>
                </div>
              </div>
            )}
            <div className="space-y-2">
              {products.map(p => (
                <div key={p.id} className="bg-white rounded p-3 flex items-center gap-3">
                  <img src={p.image} className="w-12 h-12 rounded object-cover shrink-0" alt="" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-bold text-[#222] truncate">{p.name}</p>
                    <p className="text-[10px] text-[#999]">{p.category}</p>
                    <p className="text-[12px] font-bold text-[#F85606]">৳{p.price.toLocaleString()}</p>
                  </div>
                  <div className="flex gap-1.5 shrink-0">
                    <button onClick={() => setEditProd({...p})} className="w-7 h-7 bg-blue-50 text-blue-500 rounded flex items-center justify-center cursor-pointer"><Edit3 size={12} /></button>
                    <button onClick={() => deleteProduct(p.id)} className="w-7 h-7 bg-red-50 text-red-500 rounded flex items-center justify-center cursor-pointer"><Trash2 size={12} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'orders' && (
          <div className="space-y-2">
            {orders.length === 0 ? <div className="bg-white rounded p-8 text-center"><p className="text-[12px] text-[#999]">No orders</p></div> :
              orders.map(o => (
                <div key={o.id} className="bg-white rounded p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div><p className="text-[12px] font-bold">#{o.id.slice(-6)} • {o.customerName}</p><p className="text-[10px] text-[#999]">{o.date} • ৳{(o.total || 0).toLocaleString()}</p></div>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${o.status === 'Delivered' ? 'bg-green-50 text-[#00B14F]' : 'bg-yellow-50 text-[#F85606]'}`}>{o.status}</span>
                  </div>
                  <div className="flex gap-1.5">
                    {['Pending', 'Processing', 'Shipped', 'Delivered'].map(s => (
                      <button key={s} onClick={() => updateOrderStatus(o.id, s)}
                        className={`px-2.5 py-1 rounded text-[10px] font-bold cursor-pointer ${o.status === s ? 'bg-[#222] text-white' : 'bg-gray-100 text-[#666]'}`}>{s}</button>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        )}

        {tab === 'users' && (
          <div className="space-y-2">
            {users.map(u => (
              <div key={u.id} className="bg-white rounded p-3 flex items-center gap-3">
                <div className="w-9 h-9 bg-[#F85606] rounded-full flex items-center justify-center text-white text-[12px] font-bold">{u.name.charAt(0)}</div>
                <div className="flex-1"><p className="text-[12px] font-bold text-[#222]">{u.name}</p><p className="text-[10px] text-[#999]">{u.email}</p></div>
                <span className={`text-[10px] px-2 py-0.5 rounded font-bold capitalize ${u.role === 'admin' ? 'bg-red-50 text-red-500' : u.role === 'moderator' ? 'bg-blue-50 text-blue-500' : 'bg-green-50 text-[#00B14F]'}`}>{u.role}</span>
              </div>
            ))}
          </div>
        )}

        {tab === 'coupons' && (
          <div className="space-y-2">
            {coupons.map((c, i) => (
              <div key={i} className="bg-white rounded p-3 flex items-center justify-between">
                <div><p className="text-[12px] font-bold font-mono text-[#222]">{c.code}</p><p className="text-[10px] text-[#999]">{c.discount}% off</p></div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-green-50 text-[#00B14F] font-bold">Active</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
