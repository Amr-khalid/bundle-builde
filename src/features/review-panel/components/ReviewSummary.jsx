import { formatCurrency } from '../../../shared/utils/formatCurrency';
import { Shield, Truck } from 'lucide-react';

/**
 * Summary section at the bottom of the review panel.
 * Shows shipping, guarantee, financing, total, savings.
 */
export default function ReviewSummary({
  subtotal,
  compareTotal,
  savings,
  reviewPanelData,
}) {
  const hasSavings = savings > 0;
  const installmentAmount = subtotal / 4;

  return (
    <div className="space-y-3 pt-2">
      {/* Shipping */}
      <div className="flex items-center justify-between text-sm">
        <span className="flex items-center gap-2 text-text-secondary">
          <Truck size={16} className="text-primary" />
          {reviewPanelData.shippingLabel}
        </span>
        <span className="font-semibold text-success">
          {reviewPanelData.shippingPrice}
        </span>
      </div>

      {/* Guarantee */}
      <div className="flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-xs text-success">
        <Shield size={14} />
        <span className="font-medium">{reviewPanelData.guaranteeText}</span>
      </div>

      {/* Financing */}
      <p className="text-center text-xs text-text-secondary">
        {reviewPanelData.financingText}{' '}
        <span className="font-semibold text-text-primary">
          {formatCurrency(installmentAmount)}
        </span>{' '}
        with{' '}
        <span className="font-semibold capitalize">
          {reviewPanelData.financingProvider}
        </span>
      </p>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Total */}
      <div className="flex items-center justify-between">
        <span className="text-base font-semibold text-text-primary">Total</span>
        <div className="flex items-center gap-2">
          {hasSavings && (
            <span className="text-sm text-text-muted line-through">
              {formatCurrency(compareTotal)}
            </span>
          )}
          <span className="text-lg font-bold text-primary">
            {formatCurrency(subtotal)}
          </span>
        </div>
      </div>

      {/* Savings */}
      {hasSavings && (
        <p className="text-center text-sm font-semibold text-success">
          🎉 You&apos;re saving {formatCurrency(savings)}!
        </p>
      )}
    </div>
  );
}
