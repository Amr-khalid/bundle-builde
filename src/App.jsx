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
    <div className="min-h-screen bg-bg">
      {/* Top Header Navigation */}
      <header className="border-b border-border bg-white px-4 py-4 md:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-sans text-lg font-extrabold tracking-tight text-primary">
              SECURE<span className="text-text-primary">HOME</span>
            </span>
            <span className="hidden rounded bg-primary-light px-2 py-0.5 text-xs font-semibold text-primary sm:inline-block">
              Bundle Builder
            </span>
          </div>
          <div className="text-xs text-text-secondary md:text-sm">
            Need help?{' '}
            <span className="font-semibold text-primary underline cursor-pointer">
              Contact Support
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold tracking-tight text-text-primary md:text-3xl">
            Let&apos;s get started!
          </h1>
          <p className="mt-2 text-sm text-text-secondary md:text-base max-w-2xl">
            Build your custom security system in 4 simple steps. Select cameras,
            customize your professional plan, add sensors, and choose extra
            protection.
          </p>
        </div>

        {/* Responsive Layout Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Builder */}
          <div className="lg:col-span-7 xl:col-span-8">
            <BundleBuilder />
          </div>

          {/* Right Column: Sticky Summary Panel */}
          <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-6">
            <ReviewPanel />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-border bg-white py-8 text-center text-xs text-text-secondary">
        <div className="mx-auto max-w-7xl px-4">
          <p>© 2026 SecureHome Inc. All rights reserved.</p>
          <p className="mt-1">Test ID: 41858 | Build version 1.0.0</p>
        </div>
      </footer>
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
