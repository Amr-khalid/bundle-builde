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
      className={`overflow-hidden transition-all duration-300 bg-white ${
        isOpen
          ? 'rounded-xl border-2 border-indigo-600 shadow-md my-4'
          : 'border-b border-gray-200'
      }`}
    >
      {/* Step Header */}
      <button
        type="button"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className={`flex w-full items-center gap-4 px-6 py-5 text-left transition-colors hover:bg-gray-50/60 ${
          isOpen ? 'bg-indigo-50/30' : ''
        }`}
        aria-expanded={isOpen}
        aria-controls={`step-content-${step.id}`}
        id={`step-header-${step.id}`}
      >
        {/* Step Icon */}
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
            isOpen ? 'bg-indigo-600 text-white' : 'bg-transparent text-gray-500 border border-gray-300'
          }`}
        >
          <Icon size={20} />
        </div>

        {/* Step Info */}
        <div className="flex-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted">
            Step {step.stepNumber} of {totalSteps}
          </span>
          <h2 className="text-lg font-semibold text-text-primary mt-0.5">
            {step.title}
          </h2>
        </div>

        {/* Right: Selected count or chevron */}
        <div className="flex items-center gap-3">
          {selectedCount > 0 && (
            <span className="text-sm font-semibold text-indigo-600 animate-fade-in">
              {selectedCount} selected
            </span>
          )}
          {isOpen ? (
            <ChevronUp size={20} className="text-indigo-600" />
          ) : (
            <ChevronDown size={20} className="text-gray-400" />
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
        <div className="overflow-hidden min-h-0">
          <div className="border-t border-indigo-100 px-6 pb-6 pt-5">
            {/* Product Grid */}
            <ProductGrid products={step.products} />

            {/* Next Button */}
            {step.nextLabel && (
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={handleNext}
                  className="rounded-lg border-2 border-indigo-600 bg-white px-8 py-2.5 text-[15px] font-bold text-indigo-600 transition-colors hover:bg-indigo-50 focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
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
  );
}

export default memo(AccordionStep);
