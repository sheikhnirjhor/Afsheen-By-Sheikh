import { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { MessageCircle, Send, Search } from 'lucide-react';

export default function ModeratorDashboard() {
  const { session, chatMessages, sendChatMessage, setCurrentView } = useApp();
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [chatMessages, selectedUser]);

  const chatUsers = {};
  chatMessages.forEach(msg => {
    if (!chatUsers[msg.userId]) chatUsers[msg.userId] = { userId: msg.userId, messages: [] };
    chatUsers[msg.userId].messages.push(msg);
  });
  let userList = Object.values(chatUsers).sort((a, b) => new Date(b.messages[b.messages.length - 1]?.timestamp) - new Date(a.messages[a.messages.length - 1]?.timestamp));
  if (searchTerm) userList = userList.filter(u => u.userId.toLowerCase().includes(searchTerm.toLowerCase()));
  const selectedMessages = selectedUser ? chatMessages.filter(m => m.userId === selectedUser) : [];

  const handleSend = () => {
    if (!message.trim() || !selectedUser) return;
    sendChatMessage(selectedUser, message, 'moderator');
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="bg-[#222] text-white px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#F85606] rounded flex items-center justify-center font-bold text-[14px]">A</div>
          <span className="text-[14px] font-bold">Moderator Dashboard</span>
        </div>
        <button onClick={() => setCurrentView('home')} className="text-[11px] text-gray-400 hover:text-white cursor-pointer">← Back to Store</button>
      </div>
      <div className="max-w-[1200px] mx-auto px-4 py-4">
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[{ l: 'Active Chats', v: Object.keys(chatUsers).length }, { l: 'Messages', v: chatMessages.length }, { l: 'Response', v: '<5 min' }].map((s, i) => (
            <div key={i} className="bg-white rounded p-3"><p className="text-[10px] text-[#999]">{s.l}</p><p className="text-[18px] font-bold text-[#222]">{s.v}</p></div>
          ))}
        </div>

        <div className="bg-white rounded overflow-hidden" style={{ height: '500px' }}>
          <div className="flex h-full">
            {/* User List */}
            <div className="w-60 border-r border-gray-200 flex flex-col">
              <div className="p-2 border-b border-gray-200">
                <div className="relative"><Search size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-[#999]" />
                  <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-7 pr-2 py-1.5 border border-gray-200 rounded text-[11px]" placeholder="Search..." />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                {userList.length === 0 ? <p className="p-4 text-center text-[11px] text-[#999]">No chats yet</p> :
                  userList.map(u => (
                    <button key={u.userId} onClick={() => setSelectedUser(u.userId)}
                      className={`w-full text-left px-3 py-2.5 border-b border-gray-50 cursor-pointer ${selectedUser === u.userId ? 'bg-[#F85606]/5 border-l-2 border-l-[#F85606]' : 'hover:bg-gray-50'}`}>
                      <p className="text-[11px] font-bold text-[#222]">{u.userId}</p>
                      <p className="text-[10px] text-[#999] truncate">{u.messages[u.messages.length - 1]?.text}</p>
                    </button>
                  ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {selectedUser ? (
                <>
                  <div className="px-4 py-2.5 border-b border-gray-200">
                    <p className="text-[12px] font-bold text-[#222]">{selectedUser}</p>
                  </div>
                  <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50">
                    {selectedMessages.map(msg => (
                      <div key={msg.id} className={`flex ${msg.sender === 'moderator' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[75%] px-3 py-2 rounded-lg text-[11px] ${
                          msg.sender === 'moderator' ? 'bg-[#F85606] text-white rounded-br-sm' : 'bg-white border border-gray-200 rounded-bl-sm text-[#222]'
                        }`}>
                          <p>{msg.text}</p>
                          <p className={`text-[9px] mt-1 ${msg.sender === 'moderator' ? 'text-white/60' : 'text-[#999]'}`}>{msg.time}</p>
                        </div>
                      </div>
                    ))}
                    <div ref={chatEndRef} />
                  </div>
                  <div className="p-3 border-t border-gray-200 flex gap-1.5">
                    <input type="text" value={message} onChange={e => setMessage(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded text-[11px]" placeholder="Reply..." />
                    <button onClick={handleSend} className="w-9 h-9 bg-[#F85606] rounded flex items-center justify-center text-white cursor-pointer"><Send size={14} /></button>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center"><MessageCircle size={32} className="text-gray-200 mx-auto mb-2" /><p className="text-[12px] text-[#999]">Select a chat</p></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
