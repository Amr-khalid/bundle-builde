/**
 * Format a number as USD currency string.
 * @param {number} amount
 * @returns {string} e.g. "$35.98"
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}
