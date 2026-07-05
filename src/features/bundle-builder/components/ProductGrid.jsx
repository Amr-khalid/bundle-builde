import ProductCard from './ProductCard';

/**
 * Grid layout for product cards within a step.
 * Uses Flexbox wrap and centers the cards.
 * If the number of items is odd, the last item is centered.
 */
export default function ProductGrid({ products }) {
  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {products.map((product) => (
        <div
          key={product.id}
          className="w-full md:w-[calc(50%-12px)] max-w-[460px]"
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
