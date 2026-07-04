import { memo } from 'react';

/**
 * Discount badge component (e.g., "Save 22%").
 * Positioned absolutely at the top-left of a product card.
 */
function Badge({ text }) {
  if (!text) return null;

  return (
    <span
      className="absolute top-3 left-3 z-10 inline-flex items-center rounded-full bg-indigo-600 px-2.5 py-0.5 text-[11px] font-bold text-white shadow-sm"
      aria-label={`Discount: ${text}`}
    >
      {text}
    </span>
  );
}

export default memo(Badge);
