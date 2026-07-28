import { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { MessageCircle, X, Send, Minus } from 'lucide-react';

export default function LiveChatWidget() {
  const { session, sendChatMessage } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const chatEndRef = useRef(null);
  const userId = session?.id || 'guest';

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [isOpen]);

  const sendMessage = () => {
    if (!message.trim()) return;
    sendChatMessage(userId, message, 'user');
    setMessage('');
    setTimeout(() => sendChatMessage(userId, 'Thank you! Our support team will respond shortly. Call +880 1712-345678 for urgent queries.', 'support'), 1500);
  };

  if (!isOpen) {
    return (
      <button onClick={() => setIsOpen(true)}
        className="fixed bottom-20 md:bottom-6 right-4 z-50 w-12 h-12 bg-[#F85606] rounded-full shadow-lg flex items-center justify-center text-white hover:bg-[#E04D05] transition-all cursor-pointer">
        <MessageCircle size={20} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 z-50 w-[320px] animate-scaleIn">
      <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
        <div className="bg-[#F85606] px-4 py-3 flex items-center justify-between">
          <div>
            <p className="text-[13px] font-bold text-white">Afsheen Live Chat</p>
            <p className="text-[10px] text-white/70">We typically reply in minutes</p>
          </div>
          <div className="flex gap-1">
            <button onClick={() => setMinimized(!minimized)} className="w-6 h-6 rounded bg-white/20 flex items-center justify-center text-white cursor-pointer"><Minus size={12} /></button>
            <button onClick={() => setIsOpen(false)} className="w-6 h-6 rounded bg-white/20 flex items-center justify-center text-white cursor-pointer"><X size={12} /></button>
          </div>
        </div>
        {!minimized && (
          <>
            <div className="h-60 overflow-y-auto p-3 space-y-2 bg-gray-50">
              <div className="flex justify-start">
                <div className="max-w-[85%] px-3 py-2 rounded-lg bg-white border border-gray-200 text-[12px] text-[#222]">
                  Hello! How can we help you today?
                  <p className="text-[9px] text-[#999] mt-1">Support</p>
                </div>
              </div>
              <div ref={chatEndRef} />
            </div>
            <div className="p-3 border-t border-gray-200">
              <div className="flex gap-1.5">
                <input type="text" value={message} onChange={e => setMessage(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMessage()}
                  className="flex-1 px-3 py-2 border border-gray-200 rounded text-[12px] placeholder:text-[#999]"
                  placeholder="Type a message..." />
                <button onClick={sendMessage}
                  className="w-9 h-9 bg-[#F85606] rounded flex items-center justify-center text-white cursor-pointer">
                  <Send size={14} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
