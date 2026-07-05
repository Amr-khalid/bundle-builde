import { useMemo, useCallback } from 'react';
import { useBundle } from '../../context/BundleContext';
import {
  getGroupedItems,
  getSubtotal,
  getCompareTotal,
  getSavings,
} from '../bundle-builder/selectors';
import ReviewSection from './components/ReviewSection';
import ReviewSummary from './components/ReviewSummary';
import SaveSystem from './components/SaveSystem';

const CATEGORY_ORDER = ['Cameras', 'Sensors', 'Accessories', 'Plan'];

/**
 * ReviewPanel — "Your security system" sidebar.
 * Has "REVIEW" uppercase label above.
 * Displays grouped items, totals, checkout button, and save link.
 * Matches Figma design exactly.
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
    <div>
      {/* REVIEW Label */}
      <div className="mb-2 px-1">
        <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-gray-400">
          Review
        </span>
      </div>

      <aside
        className="rounded-xl bg-[#f8f8fa] p-8 md:p-10 lg:min-h-[calc(100vh-140px)] flex flex-col justify-between"
        aria-label="Your security system summary"
      >
        <div className="flex-1 flex flex-col justify-start">
          {/* Header */}
          <div className="mb-4">
            <h2 className="text-[22px] font-bold text-gray-900">
              Your security system
            </h2>
            <p className="mt-2 text-[13px] leading-relaxed text-gray-500 border-b border-gray-200 pb-4">
              Review your personalized protection system designed to keep what
              matters most safe.
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
            <div className="py-8 text-center text-[15px] text-gray-400">
              <p>No items selected yet.</p>
              <p className="mt-1">Start building your system above!</p>
            </div>
          )}
        </div>

        {/* Summary */}
        {hasItems && (
          <div className="mt-6 pt-4  border-t border-gray-200">
            <ReviewSummary
              subtotal={subtotal}
              compareTotal={compareTotal}
              savings={savings}
            />

            {/* Checkout Button */}
            <button
              type="button"
              onClick={handleCheckout}
              className="mt-4 w-full rounded-lg bg-[#5c35e0] px-6 py-4 text-[16px] font-bold text-white transition-colors hover:bg-[#4a28b8] focus-visible:ring-2 focus-visible:ring-[#5c35e0] focus-visible:ring-offset-2"
              aria-label="Proceed to checkout"
            >
              Checkout
            </button>

            {/* Save System */}
            <div className="mt-4 text-center">
              <SaveSystem />
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
