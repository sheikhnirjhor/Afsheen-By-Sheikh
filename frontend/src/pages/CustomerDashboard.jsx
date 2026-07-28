import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Package, Star, MessageCircle, Send, MapPin, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';

export default function CustomerDashboard() {
  const { session, orders, reviews, chatMessages, sendChatMessage, setCurrentView } = useApp();
  const [tab, setTab] = useState('orders');
  const [chatInput, setChatInput] = useState('');
  const [expanded, setExpanded] = useState(null);

  const userOrders = orders.filter(o => o.userId === session?.id);
  const userReviews = reviews.filter(r => r.userId === session?.id);
  const userChats = chatMessages.filter(m => m.userId === session?.id);
  const statusSteps = ['Pending', 'Processing', 'Shipped', 'Delivered'];

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="bg-[#222] text-white px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#F85606] rounded flex items-center justify-center font-bold text-[14px]">A</div>
          <span className="text-[14px] font-bold">My Account</span>
        </div>
        <button onClick={() => setCurrentView('home')} className="text-[11px] text-gray-400 hover:text-white cursor-pointer">← Back to Store</button>
      </div>
      <div className="max-w-[1200px] mx-auto px-4 py-4">
        <div className="bg-white rounded p-4 mb-4 flex items-center gap-4">
          <div className="w-14 h-14 bg-[#F85606] rounded-full flex items-center justify-center text-white text-[20px] font-bold">{session?.name?.charAt(0)}</div>
          <div>
            <h1 className="text-[16px] font-bold text-[#222]">{session?.name}</h1>
            <p className="text-[11px] text-[#666]">{session?.email} • {userOrders.length} orders • {userReviews.length} reviews</p>
          </div>
        </div>

        <div className="flex gap-1 mb-4 overflow-x-auto">
          {[{ id: 'orders', label: 'My Orders' }, { id: 'reviews', label: 'Reviews' }, { id: 'chat', label: 'Live Chat' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2 text-[12px] font-bold rounded whitespace-nowrap cursor-pointer ${tab === t.id ? 'bg-[#F85606] text-white' : 'bg-white text-[#666]'}`}>{t.label}</button>
          ))}
        </div>

        {tab === 'orders' && (
          <div>
            {userOrders.length === 0 ? (
              <div className="bg-white rounded p-8 text-center">
                <Package size={32} className="text-gray-200 mx-auto mb-2" />
                <p className="text-[12px] text-[#999] mb-3">No orders yet</p>
                <button onClick={() => setCurrentView('shop')} className="px-4 py-2 bg-[#F85606] text-white text-[11px] font-bold rounded cursor-pointer">Shop Now</button>
              </div>
            ) : (
              <div className="space-y-2">
                {userOrders.map(order => (
                  <div key={order.id} className="bg-white rounded overflow-hidden">
                    <button onClick={() => setExpanded(expanded === order.id ? null : order.id)}
                      className="w-full flex items-center justify-between px-4 py-3 text-left cursor-pointer hover:bg-gray-50">
                      <div>
                        <p className="text-[12px] font-bold text-[#222]">#{order.id.slice(-6)}</p>
                        <p className="text-[10px] text-[#999]">{order.date} • {order.items?.length || 0} items</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${order.status === 'Delivered' ? 'bg-green-50 text-[#00B14F]' : 'bg-yellow-50 text-[#F85606]'}`}>{order.status}</span>
                        <span className="text-[12px] font-bold text-[#F85606]">৳{(order.total || 0).toLocaleString()}</span>
                        {expanded === order.id ? <ChevronUp size={14} className="text-[#999]" /> : <ChevronDown size={14} className="text-[#999]" />}
                      </div>
                    </button>
                    {expanded === order.id && (
                      <div className="px-4 pb-4 border-t border-gray-100 animate-slideDown">
                        <div className="py-3 flex items-center justify-between">
                          {statusSteps.map((step, i) => {
                            const ci = statusSteps.indexOf(order.status);
                            return (
                              <div key={step} className="flex-1 flex flex-col items-center relative">
                                {i > 0 && <div className={`absolute top-3.5 right-1/2 w-full h-0.5 ${i <= ci ? 'bg-[#F85606]' : 'bg-gray-200'}`} />}
                                <div className={`relative z-10 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold ${i <= ci ? 'bg-[#F85606] text-white' : 'bg-gray-200 text-[#999]'}`}>
                                  {i < ci ? <CheckCircle size={14} /> : i + 1}
                                </div>
                                <p className={`text-[9px] mt-1 ${i <= ci ? 'text-[#222] font-bold' : 'text-[#999]'}`}>{step}</p>
                              </div>
                            );
                          })}
                        </div>
                        <div className="space-y-1.5">
                          {order.items?.map((item, i) => (
                            <div key={i} className="flex items-center gap-2 py-1.5">
                              <img src={item.image} className="w-10 h-10 rounded object-cover" alt="" />
                              <div className="flex-1 min-w-0">
                                <p className="text-[11px] font-medium text-[#222] truncate">{item.name}</p>
                                <p className="text-[10px] text-[#999]">Qty: {item.quantity}</p>
                              </div>
                              <p className="text-[11px] font-bold text-[#F85606]">৳{(item.price * item.quantity).toLocaleString()}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === 'reviews' && (
          <div className="space-y-2">
            {userReviews.length === 0 ? <div className="bg-white rounded p-8 text-center"><Star size={32} className="text-gray-200 mx-auto mb-2" /><p className="text-[12px] text-[#999]">No reviews yet</p></div> :
              userReviews.map((r, i) => (
                <div key={i} className="bg-white rounded p-3">
                  <div className="flex gap-0.5 mb-1">{[...Array(5)].map((_, j) => <Star key={j} size={11} className={j < r.rating ? 'text-[#FFC400] fill-[#FFC400]' : 'text-gray-200'} />)}</div>
                  <p className="text-[11px] text-[#666]">"{r.comment}"</p>
                </div>
              ))}
          </div>
        )}

        {tab === 'chat' && (
          <div className="bg-white rounded overflow-hidden" style={{ height: '420px' }}>
            <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50" style={{ height: 'calc(100% - 50px)' }}>
              {userChats.length === 0 ? (
                <div className="flex items-center justify-center h-full"><p className="text-[12px] text-[#999]">Start a conversation</p></div>
              ) : userChats.map(msg => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[75%] px-3 py-2 rounded-lg text-[11px] ${msg.sender === 'user' ? 'bg-[#F85606] text-white rounded-br-sm' : 'bg-white border border-gray-200 rounded-bl-sm text-[#222]'}`}>
                    <p>{msg.text}</p>
                    <p className={`text-[9px] mt-1 ${msg.sender === 'user' ? 'text-white/60' : 'text-[#999]'}`}>{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-gray-200 flex gap-1.5">
              <input type="text" value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (sendChatMessage(session.id, chatInput, 'user'), setChatInput(''))}
                className="flex-1 px-3 py-2 border border-gray-200 rounded text-[11px]" placeholder="Type..." />
              <button onClick={() => { if (chatInput.trim()) { sendChatMessage(session.id, chatInput, 'user'); setChatInput(''); } }}
                className="w-9 h-9 bg-[#F85606] rounded flex items-center justify-center text-white cursor-pointer"><Send size={14} /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

//updated
