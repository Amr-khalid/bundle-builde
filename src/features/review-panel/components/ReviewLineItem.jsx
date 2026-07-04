import { memo, useCallback } from 'react';
import QuantityStepper from '../../../shared/components/QuantityStepper';
import { useBundle } from '../../../context/BundleContext';
import { formatCurrency } from '../../../shared/utils/formatCurrency';

/**
 * Single line item in the review panel.
 * Shows thumbnail, name, quantity stepper, and line price.
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

  const linePrice = variant.price * quantity;

  // Build display name — include color if variant has one
  const displayName = variant.color
    ? `${product.name} - ${variant.color}`
    : product.name;

  return (
    <div className="flex items-center gap-3 py-2.5">
      {/* Thumbnail */}
      <div
        className="shrink-0 overflow-hidden rounded-lg bg-gray-50 p-1 flex items-center justify-center"
        style={{ height: '40px', width: '40px' }}
      >
        <img
          src={variant.image || product.image}
          alt={displayName}
          style={{ height: '32px', width: '32px' }}
          className="object-contain"
          loading="lazy"
        />
      </div>

      {/* Name */}
      <div className="flex-1 min-w-0">
        <p className="truncate text-sm font-medium text-text-primary">
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
      <span className="ml-2 min-w-[60px] text-right text-sm font-semibold text-text-primary tabular-nums">
        {formatCurrency(linePrice)}
      </span>
    </div>
  );
}

export default memo(ReviewLineItem);
