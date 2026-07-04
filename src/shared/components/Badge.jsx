import { memo } from 'react';

/**
 * Discount badge component (e.g., "Save 22%").
 * Positioned absolutely at the top-left of a product card.
 */
function Badge({ text }) {
  if (!text) return null;

  return (
    <span
      className="absolute top-2 left-2 z-10 inline-flex items-center rounded-full bg-badge-bg px-2.5 py-0.5 text-xs font-semibold text-badge-text"
      aria-label={`Discount: ${text}`}
    >
      {text}
    </span>
  );
}

export default memo(Badge);
