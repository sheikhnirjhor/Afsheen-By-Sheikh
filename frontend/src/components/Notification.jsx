import { CheckCircle, AlertCircle, Info } from 'lucide-react';

export default function Notification({ notification }) {
  if (!notification) return null;
  const isError = notification.type === 'error';
  const isInfo = notification.type === 'info';
  return (
    <div className="fixed top-20 right-4 z-[100] animate-slideIn">
      <div className={`flex items-center gap-2 px-4 py-3 rounded shadow-lg max-w-sm border ${
        isError ? 'bg-red-50 border-red-200 text-red-700' :
        isInfo ? 'bg-blue-50 border-blue-200 text-blue-700' :
        'bg-white border-gray-200 text-[#222]'
      }`}>
        {isError ? <AlertCircle size={16} className="shrink-0" /> :
         isInfo ? <Info size={16} className="shrink-0" /> :
         <CheckCircle size={16} className="text-[#00B14F] shrink-0" />}
        <p className="text-[12px] font-medium">{notification.message}</p>
      </div>
    </div>
  );
}
