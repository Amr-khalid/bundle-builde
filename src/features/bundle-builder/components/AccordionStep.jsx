import { memo, useCallback, useMemo } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Camera,
  Shield,
  Radio,
  ShieldCheck,
} from 'lucide-react';
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
 * AccordionStep component.
 * Contains step header with label, icon, title, selected counter, and chevron.
 * Expandable body with product grid and "Next" button.
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
    <div
      className={`overflow-hidden rounded-xl border transition-all duration-300 bg-white ${
        isOpen
          ? 'border-primary border-l-4 border-l-primary shadow-sm'
          : 'border-border'
      }`}
    >
      {/* Step Header */}
      <button
        type="button"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-gray-50/60"
        aria-expanded={isOpen}
        aria-controls={`step-content-${step.id}`}
        id={`step-header-${step.id}`}
      >
        {/* Step Icon */}
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
            isOpen ? 'bg-primary text-white' : 'bg-gray-100 text-text-secondary'
          }`}
        >
          <Icon size={20} />
        </div>

        {/* Step Info */}
        <div className="flex-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted">
            Step {step.stepNumber} of {totalSteps}
          </span>
          <h2 className="text-base font-semibold text-text-primary">
            {step.title}
          </h2>
        </div>

        {/* Right: Selected count or chevron */}
        <div className="flex items-center gap-3">
          {selectedCount > 0 && (
            <span className="rounded-full bg-primary-light px-2.5 py-0.5 text-xs font-semibold text-primary animate-fade-in">
              {selectedCount} selected
            </span>
          )}
          {isOpen ? (
            <ChevronUp size={20} className="text-text-muted" />
          ) : (
            <ChevronDown size={20} className="text-text-muted" />
          )}
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
        <div className="overflow-hidden">
          <div className="border-t border-border px-5 pb-5 pt-4">
            {/* Product Grid */}
            <ProductGrid products={step.products} />

            {/* Next Button */}
            {step.nextLabel && (
              <button
                type="button"
                onClick={handleNext}
                className="mt-5 w-full rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-hover focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                aria-label={step.nextLabel}
              >
                {step.nextLabel}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(AccordionStep);
