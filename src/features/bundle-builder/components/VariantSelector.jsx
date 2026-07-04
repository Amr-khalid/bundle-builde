import { memo, useCallback } from 'react';

/**
 * Variant selector: row of color chips for products with multiple variants.
 * Each variant owns its own quantity; switching only changes which one the stepper controls.
 *
 * @param {Object} props
 * @param {Array} props.variants - Array of variant objects
 * @param {string} props.activeVariantId - Currently selected variant ID
 * @param {Function} props.onSelect - Called with variantId when a chip is clicked
 */
function VariantSelector({ variants, activeVariantId, onSelect }) {
  // Don't render if product has only one variant with no color
  if (!variants || variants.length <= 1) {
    if (variants?.[0]?.color === null) return null;
  }

  return (
    <div
      className="flex flex-wrap gap-2"
      role="radiogroup"
      aria-label="Color options"
    >
      {variants.map((variant) => {
        const isActive = variant.id === activeVariantId;
        return (
          <VariantChip
            key={variant.id}
            variant={variant}
            isActive={isActive}
            onSelect={onSelect}
          />
        );
      })}
    </div>
  );
}

const VariantChip = memo(function VariantChip({ variant, isActive, onSelect }) {
  const handleClick = useCallback(() => {
    onSelect(variant.id);
  }, [onSelect, variant.id]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onSelect(variant.id);
      }
    },
    [onSelect, variant.id]
  );

  if (!variant.color) return null;

  return (
    <button
      type="button"
      role="radio"
      aria-checked={isActive}
      aria-label={`Color: ${variant.color}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-all ${
        isActive
          ? 'border-primary bg-primary-light text-primary'
          : 'border-border bg-white text-text-secondary hover:border-gray-400'
      }`}
    >
      <span
        className={`inline-block h-3 w-3 rounded-full border ${
          variant.swatch === '#FFFFFF'
            ? 'border-gray-300'
            : 'border-transparent'
        }`}
        style={{ backgroundColor: variant.swatch }}
        aria-hidden="true"
      />
      {variant.color}
    </button>
  );
});

export default memo(VariantSelector);
