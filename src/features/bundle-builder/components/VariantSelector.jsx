import { memo, useCallback } from 'react';

/**
 * Variant selector: row of color chips for products with multiple variants.
 * Each variant shows a colored circle + text label.
 * Selected variant has indigo border, unselected has gray border.
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
      className={`inline-flex items-center gap-2 rounded-md border px-2 py-1 text-[13px] font-medium transition-all ${
        isActive
          ? 'border-[#00A389] bg-[#e6f7f1] text-gray-900 shadow-sm'
          : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
      }`}
      style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
    >
      {variant.image ? (
        <img
          src={variant.image}
          alt=""
          style={{
            height: '20px',
            width: 'auto',
            objectFit: 'contain',
            flexShrink: 0,
          }}
          aria-hidden="true"
        />
      ) : (
        <span
          className={`inline-block rounded-full border ${
            variant.swatch === '#FFFFFF'
              ? 'border-gray-300'
              : 'border-transparent'
          }`}
          style={{
            backgroundColor: variant.swatch,
            width: '16px',
            height: '16px',
            flexShrink: 0,
          }}
          aria-hidden="true"
        />
      )}
      {variant.color}
    </button>
  );
});

export default memo(VariantSelector);
