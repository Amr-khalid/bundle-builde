import { memo, useCallback, useMemo } from 'react';
import { Camera, Shield, Radio, ShieldCheck } from 'lucide-react';
import { useBundle } from '../../../context/BundleContext';
import { getSelectedCount } from '../selectors';
import ProductGrid from './ProductGrid';

const STEP_ICONS = {
  camera: Camera,
  shield: Shield,
  radio: Radio,
  'shield-check': ShieldCheck,
};

/**
 * AccordionStep component — matches Figma design.
 * "STEP X OF 4" label above a horizontal rule.
 * Expandable body with light blue/lavender background and indigo border.
 * Collapsed steps show just icon + title + "N selected" with divider below.
 * Uses filled triangle ▲/▼ instead of chevron icons.
 */
function AccordionStep({ step, totalSteps }) {
  const { state, setStep } = useBundle();
  const isOpen = state.activeStep === step.stepNumber - 1;
  const selectedCount = useMemo(
    () => getSelectedCount(state.cart, step.id),
    [state.cart, step.id]
  );

  const Icon = STEP_ICONS[step.icon] || Camera;

  const handleToggle = useCallback(() => {
    setStep(isOpen ? -1 : step.stepNumber - 1);
  }, [isOpen, step.stepNumber, setStep]);

  const handleNext = useCallback(() => {
    if (step.stepNumber < totalSteps) {
      setStep(step.stepNumber);
    }
  }, [step.stepNumber, totalSteps, setStep]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleToggle();
      }
    },
    [handleToggle]
  );

  return (
    <div>
      {/* Step Info Label */}
      <div className="border-t border-gray-300 pt-3 pb-1 px-1">
        <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-gray-400">
          Step {step.stepNumber} of {totalSteps}
        </span>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen
            ? 'rounded-xl border-2 border-[#5c35e0] bg-[#f4f6fa] shadow-sm'
            : 'bg-white border-b border-gray-200'
        }`}
      >
        {/* Step Header */}
        <button
          type="button"
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          className={`flex w-full items-center gap-4 px-5 py-4 text-left transition-colors ${
            isOpen ? '' : 'hover:bg-gray-50/60'
          }`}
          aria-expanded={isOpen}
          aria-controls={`step-content-${step.id}`}
          id={`step-header-${step.id}`}
        >
          {/* Step Icon */}
          <div
            className={`flex h-8 w-8 shrink-0 items-center justify-center transition-colors duration-300 ${
              isOpen ? 'text-gray-700' : 'text-gray-400'
            }`}
          >
            <Icon size={24} strokeWidth={1.5} />
          </div>

          {/* Step Title */}
          <div className="flex-1">
            <h2 className="text-[20px] font-bold text-gray-900">
              {step.title}
            </h2>
          </div>

          {/* Right: Selected count + triangle */}
          <div className="flex items-center gap-3">
            {selectedCount > 0 && (
              <span className="text-[14px] font-semibold text-[#5c35e0]">
                {selectedCount} selected
              </span>
            )}
            <span
              className={`text-[10px] ${isOpen ? 'text-[#5c35e0]' : 'text-gray-400'}`}
            >
              {isOpen ? '▲' : '▼'}
            </span>
          </div>
        </button>

        {/* Expandable Content */}
        <div
          id={`step-content-${step.id}`}
          role="region"
          aria-labelledby={`step-header-${step.id}`}
          className={`grid transition-all duration-300 ease-in-out ${
            isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden min-h-0">
            <div className="px-5 pb-6 pt-2">
              {/* Product Grid */}
              <ProductGrid products={step.products} />

              {/* Next Button */}
              {step.nextLabel && (
                <div className="mt-8 flex justify-center">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="rounded-lg border-2 border-[#5c35e0] bg-white px-10 py-3 text-[15px] font-bold text-[#5c35e0] transition-colors hover:bg-[#f0ebff] focus-visible:ring-2 focus-visible:ring-[#5c35e0] focus-visible:ring-offset-2"
                    aria-label={step.nextLabel}
                  >
                    {step.nextLabel}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(AccordionStep);
