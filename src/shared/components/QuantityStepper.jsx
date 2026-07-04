import { memo, useCallback } from 'react';
import { Minus, Plus } from 'lucide-react';

/**
 * Reusable quantity stepper component.
 * Used in both ProductCard and ReviewLineItem.
 * Synchronized through BundleContext.
 *
 * @param {Object} props
 * @param {number} props.quantity - Current quantity
 * @param {Function} props.onIncrement - Called when + is pressed
 * @param {Function} props.onDecrement - Called when - is pressed
 * @param {string} [props.ariaLabel] - Accessible label for the stepper
 * @param {string} [props.size] - 'sm' | 'md' (default 'md')
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
      className={`inline-flex items-center rounded-lg border border-border ${
        isSmall ? 'gap-1' : 'gap-2'
      }`}
      role="group"
      aria-label={ariaLabel}
    >
      <button
        type="button"
        onClick={handleDecrement}
        disabled={quantity <= 0}
        className={`flex items-center justify-center rounded-l-lg transition-colors ${
          isSmall ? 'h-7 w-7' : 'h-8 w-8'
        } ${
          quantity <= 0
            ? 'cursor-not-allowed text-text-muted'
            : 'text-text-secondary hover:bg-gray-100 hover:text-text-primary'
        }`}
        aria-label={`Decrease ${ariaLabel}`}
      >
        <Minus size={isSmall ? 12 : 14} />
      </button>

      <span
        className={`min-w-[20px] text-center font-semibold tabular-nums text-text-primary ${
          isSmall ? 'text-xs' : 'text-sm'
        }`}
        aria-live="polite"
        aria-atomic="true"
      >
        {quantity}
      </span>

      <button
        type="button"
        onClick={handleIncrement}
        className={`flex items-center justify-center rounded-r-lg text-text-secondary transition-colors hover:bg-gray-100 hover:text-text-primary ${
          isSmall ? 'h-7 w-7' : 'h-8 w-8'
        }`}
        aria-label={`Increase ${ariaLabel}`}
      >
        <Plus size={isSmall ? 12 : 14} />
      </button>
    </div>
  );
}

export default memo(QuantityStepper);
