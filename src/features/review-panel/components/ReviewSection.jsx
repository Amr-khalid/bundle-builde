import ReviewLineItem from './ReviewLineItem';

/**
 * A section within the review panel (e.g., "Cameras", "Sensors").
 * Shows a category heading and its line items.
 */
export default function ReviewSection({ title, items }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="border-b border-border pb-2">
      <h3 className="mb-1 text-xs font-semibold uppercase tracking-wider text-text-muted">
        {title}
      </h3>
      <div>
        {items.map((item) => (
          <ReviewLineItem key={item.variantId} item={item} />
        ))}
      </div>
    </div>
  );
}
