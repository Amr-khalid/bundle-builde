import { memo, useCallback } from 'react';
import QuantityStepper from '../../../shared/components/QuantityStepper';
import { useBundle } from '../../../context/BundleContext';
import { formatCurrency } from '../../../shared/utils/formatCurrency';

import { getLineItemPrices } from '../../bundle-builder/selectors';

/**
 * Single line item in the review panel.
 * Shows thumbnail, name, quantity stepper, and line price.
 * Plan items get special styling (name with branded "Unlimited" in green, /mo suffix).
 * Required items show "(Required)" and FREE items show green FREE text.
 */
function ReviewLineItem({ item }) {
  const { increment, decrement } = useBundle();
  const { variant, product, quantity, variantId } = item;

  const handleIncrement = useCallback(() => {
    increment(variantId);
  }, [increment, variantId]);

  const handleDecrement = useCallback(() => {
    decrement(variantId);
  }, [decrement, variantId]);

  const { price: linePrice, compareAtPrice: lineComparePrice } =
    getLineItemPrices(variantId, quantity);

  // Check if this is a free item
  const isFree = variant.price === 0;

  // Check if this is a plan item (special rendering)
  const isPlan = product.category === 'Plan';

  // Display name for required items
  const displayName = product.isRequired
    ? `${product.name} (Required)`
    : product.name;

  // Plan items render differently — "Cam" in bold black + "Unlimited" in green
  if (isPlan) {
    return (
      <div className="flex items-center gap-3 px-6 py-3">
        {/* Thumbnail */}
        <div
          className="shrink-0 rounded-lg bg-gray-100 p-1.5 flex items-center justify-center"
          style={{ height: '48px', width: '48px' }}
        >
          <img
            src={variant.image || product.image}
            alt={product.name}
            style={{ height: '36px', width: '36px' }}
            className="object-contain"
            loading="lazy"
          />
        </div>

        {/* Name — special plan branding */}
        <div className="flex-1 min-w-0">
          <p className="text-[14px] leading-tight">
            <span className="font-bold text-gray-900">Cam </span>
            <span className="font-bold text-[#059669]">Unlimited</span>
          </p>
        </div>

        {/* Price — monthly */}
        <div className="ml-1 flex flex-col items-end min-w-[70px] leading-[1.3]">
          {lineComparePrice && (
            <span className="text-[12px] font-medium text-gray-400 line-through">
              {formatCurrency(variant.compareAtPrice)}/mo
            </span>
          )}
          <span className="text-[14px] font-bold text-[#5c35e0] tabular-nums">
            {formatCurrency(variant.price)}/mo
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 py-3">
      {/* Thumbnail */}
      <div
        className="shrink-0 overflow-hidden rounded-lg bg-gray-100 p-1.5 flex items-center justify-center"
        style={{ height: '48px', width: '48px' }}
      >
        <img
          src={variant.image || product.image}
          alt={displayName}
          style={{ height: '36px', width: '36px' }}
          className="object-contain"
          loading="lazy"
        />
      </div>

      {/* Name */}
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-semibold text-gray-900 leading-tight">
          {displayName}
        </p>
      </div>

      {/* Stepper */}
      <QuantityStepper
        quantity={quantity}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        ariaLabel={`${displayName} quantity`}
        size="sm"
      />

      {/* Price */}
      <div className="ml-1 flex flex-col items-end min-w-[60px] leading-[1.3]">
        {isFree ? (
          <>
            {lineComparePrice && (
              <span className="text-[12px] font-medium text-gray-400 line-through">
                {formatCurrency(lineComparePrice)}
              </span>
            )}
            <span className="text-[14px] font-bold text-[#059669]">FREE</span>
          </>
        ) : (
          <>
            {lineComparePrice && (
              <span className="text-[12px] font-medium text-gray-400 line-through">
                {formatCurrency(lineComparePrice)}
              </span>
            )}
            <span className="text-[14px] font-bold text-[#5c35e0] tabular-nums">
              {formatCurrency(linePrice)}
            </span>
          </>
        )}
      </div>
    </div>
  );
}

export default memo(ReviewLineItem);
