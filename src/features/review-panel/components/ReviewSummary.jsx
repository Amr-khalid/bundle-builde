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
      <div className="flex items-center gap-2.5 rounded-xl bg-emerald-50/60 border border-emerald-100/50 px-4 py-2.5 text-xs text-emerald-800">
        <Shield size={15} className="text-emerald-600 shrink-0" />
        <span className="font-semibold">{reviewPanelData.guaranteeText}</span>
      </div>

      {/* Financing */}
      <div className="flex items-center justify-center gap-1.5 rounded-xl bg-gray-50/80 border border-gray-100/80 px-4 py-2 text-xs text-text-secondary">
        <span>{reviewPanelData.financingText}</span>
        <span className="font-bold text-text-primary">
          {formatCurrency(installmentAmount)}
        </span>
        <span>with</span>
        <span className="inline-flex items-center rounded bg-[#B2F5EA]/35 px-1.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-[#00A389]">
          {reviewPanelData.financingProvider}
        </span>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 my-2" />

      {/* Total */}
      <div className="flex items-center justify-between pt-1">
        <span className="text-base font-bold text-text-primary">Total</span>
        <div className="flex items-end flex-col">
          <div className="flex items-center gap-2">
            {hasSavings && (
              <span className="text-xs text-text-muted line-through">
                {formatCurrency(compareTotal)}
              </span>
            )}
            <span className="text-xl font-extrabold text-primary">
              {formatCurrency(subtotal)}
            </span>
          </div>
        </div>
      </div>

      {/* Savings */}
      {hasSavings && (
        <div className="rounded-xl bg-emerald-50 px-4 py-2 text-center text-xs font-bold text-emerald-800 border border-emerald-100/40">
          🎉 You&apos;re saving {formatCurrency(savings)} on this bundle!
        </div>
      )}
    </div>
  );
}
