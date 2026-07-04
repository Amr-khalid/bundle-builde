import { useMemo, useCallback } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useBundle } from '../../context/BundleContext';
import {
  getGroupedItems,
  getSubtotal,
  getCompareTotal,
  getSavings,
} from '../bundle-builder/selectors';
import bundleData from '../../data/bundleData.json';
import ReviewSection from './components/ReviewSection';
import ReviewSummary from './components/ReviewSummary';
import SaveSystem from './components/SaveSystem';

const CATEGORY_ORDER = ['Cameras', 'Sensors', 'Accessories', 'Plan'];

/**
 * ReviewPanel — "Your security system" sidebar.
 * Displays grouped items, totals, checkout button, and save link.
 * Updates instantly when selections change.
 */
export default function ReviewPanel() {
  const { state } = useBundle();

  const groupedItems = useMemo(() => getGroupedItems(state.cart), [state.cart]);
  const subtotal = useMemo(() => getSubtotal(state.cart), [state.cart]);
  const compareTotal = useMemo(() => getCompareTotal(state.cart), [state.cart]);
  const savings = useMemo(() => getSavings(state.cart), [state.cart]);

  const handleCheckout = useCallback(() => {
    alert(
      'Thank you! Your bundle has been submitted for checkout.\n\nThis is a prototype — no actual purchase will be made.'
    );
  }, []);

  const hasItems = useMemo(
    () => Object.values(state.cart).some((qty) => qty > 0),
    [state.cart]
  );

  return (
    <aside
      className="rounded-2xl bg-slate-50 p-6 md:p-8 lg:sticky lg:top-8"
      aria-label="Your security system summary"
    >
      {/* Header */}
      <div className="mb-2">
        <h2 className="text-xl font-bold text-gray-900">
          Your security system
        </h2>
        <p className="mt-1 text-[13px] leading-relaxed text-gray-600 border-b border-gray-200 pb-4">
          Review your personalized protection system designed to keep what matters most safe.
        </p>
      </div>

      {/* Grouped Sections */}
      {hasItems ? (
        <div className="space-y-1">
          {CATEGORY_ORDER.map((category) => (
            <ReviewSection
              key={category}
              title={category}
              items={groupedItems[category]}
            />
          ))}
        </div>
      ) : (
        <div className="py-8 text-center text-[15px] text-text-muted">
          <p>No items selected yet.</p>
          <p className="mt-1">Start building your system above!</p>
        </div>
      )}

      {/* Summary */}
      {hasItems && (
        <>
          <ReviewSummary
            subtotal={subtotal}
            compareTotal={compareTotal}
            savings={savings}
            reviewPanelData={bundleData.reviewPanel}
          />

          {/* Checkout Button */}
          <button
            type="button"
            onClick={handleCheckout}
            className="mt-6 w-full rounded bg-indigo-700 px-6 py-3.5 text-[15px] font-bold text-white transition-colors hover:bg-indigo-800 focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
            aria-label="Proceed to checkout"
          >
            Checkout
          </button>

          {/* Save System */}
          <div className="mt-4 text-center">
            <SaveSystem />
          </div>
        </>
      )}
    </aside>
  );
}
