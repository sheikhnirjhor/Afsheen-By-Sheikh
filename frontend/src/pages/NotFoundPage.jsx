import { useApp } from '../context/AppContext';

export default function NotFoundPage() {
  const { navigateTo } = useApp();
  return (
    <div className="flex flex-col items-center justify-center py-32 px-4 text-center">
      <p className="text-6xl font-serif font-bold text-neutral-200 mb-4">404</p>
      <h1 className="font-serif text-xl font-semibold text-neutral-900 mb-2">Page Not Found</h1>
      <p className="text-sm text-neutral-500 mb-8 max-w-sm">The page you're looking for doesn't exist or has been moved.</p>
      <button onClick={() => navigateTo('home')} className="bg-neutral-900 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-neutral-800 transition-all cursor-pointer">
        Back to Home
      </button>
    </div>
  );
}
