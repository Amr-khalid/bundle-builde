import ProductCard from './ProductCard';

/**
 * Grid layout for product cards within a step.
 * Uses CSS Grid with responsive columns.
 */
export default function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
