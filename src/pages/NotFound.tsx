import { useLocation } from 'wouter';

export default function NotFound() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-6xl font-black mb-4">404</h1>
      <p className="text-2xl text-neutral-300 mb-8">Page Not Found</p>
      <button
        onClick={() => navigate('/')}
        className="px-6 py-3 bg-orange-600 hover:bg-orange-500 rounded-lg transition-all text-white font-semibold"
        data-testid="button-back-home"
      >
        Back to Home
      </button>
    </div>
  );
}
