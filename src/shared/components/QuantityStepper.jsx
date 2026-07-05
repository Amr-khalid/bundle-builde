import { memo, useCallback } from 'react';

/**
 * Reusable quantity stepper component.
 * Used in both ProductCard and ReviewLineItem.
 * Synchronized through BundleContext.
 * Matches Figma: — N + with rounded border container.
 */
function QuantityStepper({
  quantity,
  onIncrement,
  onDecrement,
  ariaLabel = 'Quantity',
  size = 'md',
}) {
  const isSmall = size === 'sm';

  const handleDecrement = useCallback(
    (e) => {
      e.stopPropagation();
      onDecrement();
    },
    [onDecrement]
  );

  const handleIncrement = useCallback(
    (e) => {
      e.stopPropagation();
      onIncrement();
    },
    [onIncrement]
  );

  return (
    <div
      className={`inline-flex items-center rounded-lg border border-gray-300 ${
        isSmall ? 'gap-0' : 'gap-0'
      }`}
      role="group"
      aria-label={ariaLabel}
    >
      <button
        type="button"
        onClick={handleDecrement}
        disabled={quantity <= 0}
        className={`flex items-center justify-center transition-colors ${
          isSmall ? 'h-7 w-7' : 'h-9 w-9'
        } ${
          quantity <= 0
            ? 'cursor-not-allowed text-gray-300'
            : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
        }`}
        aria-label={`Decrease ${ariaLabel}`}
      >
        <span className={`font-medium ${isSmall ? 'text-sm' : 'text-lg'}`}>
          —
        </span>
      </button>

      <span
        className={`min-w-[24px] text-center font-semibold tabular-nums text-gray-900 ${
          isSmall ? 'text-sm' : 'text-base'
        }`}
        aria-live="polite"
        aria-atomic="true"
      >
        {quantity}
      </span>

      <button
        type="button"
        onClick={handleIncrement}
        className={`flex items-center justify-center text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 ${
          isSmall ? 'h-7 w-7' : 'h-9 w-9'
        }`}
        aria-label={`Increase ${ariaLabel}`}
      >
        <span className={`font-medium ${isSmall ? 'text-sm' : 'text-lg'}`}>
          +
        </span>
      </button>
    </div>
  );
}

export default memo(QuantityStepper);
