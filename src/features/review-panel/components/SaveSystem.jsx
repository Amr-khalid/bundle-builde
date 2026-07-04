import { useCallback, useState } from 'react';
import { Bookmark } from 'lucide-react';
import { useBundle } from '../../../context/BundleContext';
import { usePersistBundle } from '../../../shared/hooks/usePersistBundle';

/**
 * Save system button with confirmation toast.
 */
export default function SaveSystem() {
  const { state } = useBundle();
  const { save } = usePersistBundle();
  const [showToast, setShowToast] = useState(false);

  const handleSave = useCallback(() => {
    const success = save(state);
    if (success) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  }, [save, state]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleSave}
        className="flex w-full items-center justify-center gap-2 py-2 text-sm font-medium text-primary transition-colors hover:text-primary-hover hover:underline"
        aria-label="Save my system for later"
      >
        <Bookmark size={16} />
        Save my system for later
      </button>

      {/* Toast notification */}
      {showToast && (
        <div
          className="absolute -top-12 left-1/2 -translate-x-1/2 animate-fade-in rounded-lg bg-dark px-4 py-2 text-xs font-medium text-white shadow-lg"
          role="status"
          aria-live="polite"
        >
          ✓ System saved successfully!
        </div>
      )}
    </div>
  );
}
