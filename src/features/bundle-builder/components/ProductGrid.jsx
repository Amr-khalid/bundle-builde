import ProductCard from './ProductCard';

/**
 * Grid layout for product cards within a step.
 * Uses CSS Grid with responsive columns.
 */
export default function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
