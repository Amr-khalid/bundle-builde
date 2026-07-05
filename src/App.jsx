import { useEffect } from 'react';
import { BundleProvider, useBundle } from './context/BundleContext';
import { usePersistBundle } from './shared/hooks/usePersistBundle';
import BundleBuilder from './features/bundle-builder';
import ReviewPanel from './features/review-panel';

function MainApp() {
  const { loadState } = useBundle();
  const { restore } = usePersistBundle();

  // Restore saved system state on load
  useEffect(() => {
    const saved = restore();
    if (saved) {
      loadState(saved);
    }
  }, [restore, loadState]);

  return (
    <div className="min-h-screen bg-white">
      {/* Main Container */}
      <main className="mx-auto max-w-[1360px] px-6 py-10 md:px-10 md:py-14">
        {/* Page Title */}
        <div className="mb-10 text-center lg:text-left">
          <h1 className="text-[32px] font-extrabold tracking-tight text-gray-900 md:text-[36px]">
            Let&apos;s get started!
          </h1>
        </div>

        {/* Responsive Layout Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10 lg:items-start">
          {/* Left Column: Builder */}
          <div className="lg:col-span-8">
            <BundleBuilder />
          </div>

          {/* Right Column: Sticky Summary Panel */}
          <div className="lg:col-span-4 lg:sticky lg:top-6">
            <ReviewPanel />
          </div>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BundleProvider>
      <MainApp />
    </BundleProvider>
  );
}
