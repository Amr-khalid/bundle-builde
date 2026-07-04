import { memo, useCallback, useMemo } from 'react';
import { useBundle } from '../../../context/BundleContext';
import Badge from '../../../shared/components/Badge';
import QuantityStepper from '../../../shared/components/QuantityStepper';
import VariantSelector from './VariantSelector';
import { formatCurrency } from '../../../shared/utils/formatCurrency';

/**
 * Product card component.
 * Displays product image, info, variant selector, quantity stepper, and pricing.
 * Selected state (qty > 0) shows highlighted border.
 */
function ProductCard({ product }) {
  const { state, increment, decrement, selectVariant } = useBundle();

  const activeVariantId = state.selectedVariants[product.id];
  const activeVariant = useMemo(
    () =>
      product.variants.find((v) => v.id === activeVariantId) ||
      product.variants[0],
    [product.variants, activeVariantId]
  );

  const currentQuantity = state.cart[activeVariant.id] || 0;

  // Check if any variant of this product has qty > 0
  const isSelected = useMemo(
    () => product.variants.some((v) => (state.cart[v.id] || 0) > 0),
    [product.variants, state.cart]
  );

  const handleIncrement = useCallback(() => {
    increment(activeVariant.id);
  }, [increment, activeVariant.id]);

  const handleDecrement = useCallback(() => {
    decrement(activeVariant.id);
  }, [decrement, activeVariant.id]);

  const handleVariantSelect = useCallback(
    (variantId) => {
      selectVariant(product.id, variantId);
    },
    [selectVariant, product.id]
  );

  // Get the image to display based on active variant
  const displayImage = activeVariant.image || product.image;

  return (
    <article
      className={`relative flex flex-col rounded-xl border p-5 transition-all bg-white ${
        isSelected
          ? 'border-indigo-600 border-2 shadow-sm'
          : 'border-gray-200 hover:border-gray-300'
      }`}
      aria-label={`Product: ${product.name}`}
    >
      {/* Badge */}
      <Badge text={product.badge} />

      {/* Product Image */}
      <div
        className="mb-5 flex items-center justify-center p-4"
        style={{ height: '144px' }}
      >
        <img
          src={displayImage}
          alt={product.name}
          style={{ height: '112px', width: 'auto' }}
          className="object-contain transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Title & Description */}
      <h3 className="text-[15px] font-semibold text-gray-900">
        {product.name}
      </h3>
      <p className="mt-1.5 text-xs text-text-secondary leading-relaxed line-clamp-2 min-h-[2.5rem]">
        {product.description}
      </p>

      {/* Learn More */}
      {product.learnMoreUrl && (
        <a
          href={product.learnMoreUrl}
          className="mt-1.5 inline-block text-[13px] font-semibold text-indigo-600 underline underline-offset-2 hover:text-indigo-800"
          aria-label={`Learn more about ${product.name}`}
        >
          Learn More
        </a>
      )}

      {/* Spacer to push bottom content down */}
      <div className="mt-auto pt-5">
        {/* Variant Selector */}
        <VariantSelector
          variants={product.variants}
          activeVariantId={activeVariant.id}
          onSelect={handleVariantSelect}
        />

        {/* Quantity + Price Row */}
        <div className="mt-4 flex items-center justify-between gap-2">
          <QuantityStepper
            quantity={currentQuantity}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            ariaLabel={`${product.name} quantity`}
          />

          <div className="flex items-center gap-2">
            {activeVariant.compareAtPrice && (
              <span className="text-xs text-text-muted line-through">
                {formatCurrency(activeVariant.compareAtPrice)}
              </span>
            )}
            <span className="text-sm font-bold text-text-primary">
              {formatCurrency(activeVariant.price)}
            </span>
            {product.isMonthly && (
              <span className="text-xs text-text-muted">/mo</span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default memo(ProductCard);
