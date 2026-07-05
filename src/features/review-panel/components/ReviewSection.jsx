import ReviewLineItem from './ReviewLineItem';

/**
 * A section within the review panel (e.g., "CAMERAS", "SENSORS").
 * Shows a category heading in uppercase gray and its line items.
 * Category "Plan" maps to special display with plan branding.
 */
export default function ReviewSection({ title, items }) {
  if (!items || items.length === 0) return null;

  // Map internal category names to display labels matching Figma
  const displayTitle =
    title === 'Plan'
      ? 'PLAN'
      : title === 'Accessories'
        ? 'ACCESSORIES'
        : title.toUpperCase();

  return (
    <div className="border-b border-gray-200 pb-1">
      <h3 className="mb-1 mt-2 text-[11px] font-bold uppercase tracking-[0.1em] text-gray-400">
        {displayTitle}
      </h3>
      <div>
        {items.map((item) => (
          <ReviewLineItem key={item.variantId} item={item} />
        ))}
      </div>
    </div>
  );
}
