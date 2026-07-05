import { memo, useCallback, useMemo } from 'react';
import { useBundle } from '../../../context/BundleContext';
import Badge from '../../../shared/components/Badge';
import QuantityStepper from '../../../shared/components/QuantityStepper';
import VariantSelector from './VariantSelector';
import { formatCurrency } from '../../../shared/utils/formatCurrency';

/**
 * Product card component — horizontal layout per Figma.
 * Image on the left, content (name, description, learn more, variants, stepper + price) on the right.
 * Selected state (qty > 0) shows blue/indigo border.
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
      className={`relative flex flex-row rounded-xl border bg-white transition-all ${
        isSelected
          ? 'border-[#5c35e0] border-2 shadow-sm'
          : 'border-gray-200 hover:border-gray-300'
      }`}
      aria-label={`Product: ${product.name}`}
    >
      {/* Badge */}
      <Badge text={product.badge} />

      {/* Product Image — Left Side */}
      <div
        className="flex shrink-0 items-center justify-center p-5"
        style={{ width: '140px' }}
      >
        <img
          src={displayImage}
          alt={product.name}
          className="h-[105px] w-auto object-contain"
          loading="lazy"
        />
      </div>

      {/* Content — Right Side */}
      <div className="flex flex-1 flex-col justify-between py-5 pr-5 pl-1">
        {/* Title & Description */}
        <div>
          <h3 className="text-[16px] font-bold text-gray-900">
            {product.name}
          </h3>
          <p className="mt-1 text-[13px] text-gray-500 leading-relaxed">
            {product.description}
            {product.learnMoreUrl && (
              <>
                {'  '}
                <a
                  href={product.learnMoreUrl}
                  className="font-semibold text-[#5c35e0] underline underline-offset-2 hover:text-[#4a28b8]"
                  aria-label={`Learn more about ${product.name}`}
                >
                  Learn More
                </a>
              </>
            )}
          </p>
        </div>

        {/* Variant Selector */}
        <div className="mt-3">
          <VariantSelector
            variants={product.variants}
            activeVariantId={activeVariant.id}
            onSelect={handleVariantSelect}
          />
        </div>

        {/* Quantity + Price Row */}
        <div className="mt-3 flex items-end justify-between gap-2">
          <QuantityStepper
            quantity={currentQuantity}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            ariaLabel={`${product.name} quantity`}
          />

          <div className="flex flex-col items-end leading-[1.3]">
            {activeVariant.compareAtPrice && (
              <span className="text-[13px] text-[#dc2626] line-through font-medium">
                {formatCurrency(activeVariant.compareAtPrice)}
              </span>
            )}
            <span className="text-[16px] font-bold text-gray-800">
              {formatCurrency(activeVariant.price)}
            </span>
            {product.isMonthly && (
              <span className="text-[11px] text-gray-500">/mo</span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default memo(ProductCard);
