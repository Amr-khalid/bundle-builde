import { useMemo } from 'react';
import { formatCurrency } from '../../../shared/utils/formatCurrency';
import { Truck } from 'lucide-react';

/**
 * Summary section at the bottom of the review panel.
 * Shows shipping, guarantee starburst badge, financing pill, total, savings.
 * Matches Figma design exactly.
 */
export default function ReviewSummary({ subtotal, compareTotal, savings }) {
  const hasSavings = savings > 0;
  const installmentAmount = (subtotal * 19.19) / 187.89;

  // Dynamically generate a 24-point star path centered at (60, 60)
  const starPath = useMemo(() => {
    const points = [];
    const numPoints = 24;
    const centerX = 60;
    const centerY = 60;
    const outerRadius = 56;
    const innerRadius = 49;

    for (let i = 0; i < numPoints * 2; i++) {
      const angle = (i * Math.PI) / numPoints - Math.PI / 2; // Offset by -90 deg to align top point
      const r = i % 2 === 0 ? outerRadius : innerRadius;
      const x = centerX + r * Math.cos(angle);
      const y = centerY + r * Math.sin(angle);
      points.push(`${x.toFixed(2)},${y.toFixed(2)}`);
    }
    return `M ${points.join(' L ')} Z`;
  }, []);

  return (
    <div className="pt-2">
      {/* Fast Shipping */}
      <div className="flex items-center justify-between text-sm py-4 border-b border-gray-200">
        <span className="flex items-center gap-3 font-semibold text-gray-900">
          <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#e6f7f1]">
            <Truck size={22} className="text-[#059669]" />
          </span>
          Fast Shipping
        </span>
        <div className="flex flex-col items-end leading-[1.3]">
          <span className="text-[12px] font-medium text-gray-400 line-through">
            $5.99
          </span>
          <span className="text-[14px] font-bold text-[#059669]">FREE</span>
        </div>
      </div>

      {/* Guarantee Seal & Total Section */}
      <div className="flex items-center justify-between py-6">
        {/* Left: Starburst Guarantee Badge (SVG for 100% precision) */}
        <div
          className="shrink-0 flex items-center justify-center"
          style={{ width: '120px', height: '120px' }}
        >
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            className="overflow-visible select-none"
          >
            <path d={starPath} fill="#5c35e0" />

            {/* Inner circular guide line */}
            <circle
              cx="60"
              cy="60"
              r="43"
              fill="none"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="0.75"
            />

            {/* Text Path for curved text */}
            <path
              id="badge-text-path"
              d="M 18,60 A 42,42 0 1,1 102,60 A 42,42 0 1,1 18,60"
              fill="none"
            />

            {/* Curved top/bottom labels */}
            <text
              className="fill-white/80 font-bold uppercase tracking-[0.14em]"
              style={{ fontSize: '5px' }}
            >
              <textPath href="#badge-text-path" startOffset="0%">
                Try worry-free for 30 days • Try worry-free for 30 days •
              </textPath>
            </text>

            {/* Center Label texts */}
            <text
              x="60"
              y="52"
              textAnchor="middle"
              className="fill-white font-extrabold text-[24px] tracking-tight"
            >
              100%
            </text>
            <text
              x="60"
              y="66"
              textAnchor="middle"
              className="fill-white font-bold text-[8px] uppercase tracking-[0.08em]"
            >
              Wyze
            </text>
            <text
              x="60"
              y="75"
              textAnchor="middle"
              className="fill-white font-bold text-[7.5px] uppercase tracking-[0.05em]"
            >
              satisfaction
            </text>
            <text
              x="60"
              y="84"
              textAnchor="middle"
              className="fill-white font-bold text-[7.5px] uppercase tracking-[0.05em]"
            >
              guarantee
            </text>
          </svg>
        </div>

        {/* Right: Total & Financing */}
        <div className="flex flex-col items-end justify-center">
          {/* Financing Pill */}
          <span className="inline-block rounded-md bg-[#5c35e0] px-3 py-1 text-[11px] font-bold text-white mb-2">
            as low as {formatCurrency(installmentAmount)}/mo
          </span>

          {/* Total row */}
          <div className="flex items-baseline gap-2">
            {hasSavings && (
              <span className="text-[14px] font-medium text-gray-400 line-through">
                {formatCurrency(compareTotal)}
              </span>
            )}
            <span className="text-[32px] font-extrabold text-[#5c35e0] tracking-tight">
              {formatCurrency(subtotal)}
            </span>
          </div>
        </div>
      </div>

      {/* Savings Text */}
      {hasSavings && (
        <div className="text-center pb-2">
          <p className="text-[13px] font-bold text-[#059669]">
            Congrats! You&apos;re saving {formatCurrency(savings)} on your
            security bundle!
          </p>
        </div>
      )}
    </div>
  );
}
