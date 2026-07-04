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
      className="rounded-xl border border-border bg-white p-5 lg:sticky lg:top-6"
      aria-label="Your security system summary"
    >
      {/* Header */}
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
          <ShoppingCart size={20} />
        </div>
        <h2 className="text-lg font-bold text-text-primary">
          Your security system
        </h2>
      </div>

      {/* Grouped Sections */}
      {hasItems ? (
        <div className="space-y-2">
          {CATEGORY_ORDER.map((category) => (
            <ReviewSection
              key={category}
              title={category}
              items={groupedItems[category]}
            />
          ))}
        </div>
      ) : (
        <div className="py-8 text-center text-sm text-text-muted">
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
            className="mt-4 w-full rounded-lg bg-primary px-6 py-3.5 text-sm font-bold text-white transition-all hover:bg-primary-hover hover:shadow-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:scale-[0.98]"
            aria-label="Proceed to checkout"
          >
            Checkout
          </button>

          {/* Save System */}
          <SaveSystem />
        </>
      )}
    </aside>
  );
}
