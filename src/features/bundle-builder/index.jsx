import bundleData from '../../data/bundleData.json';
import AccordionStep from './components/AccordionStep';

/**
 * BundleBuilder feature — responsible only for layout.
 * Maps over steps from JSON data and renders AccordionStep components.
 */
export default function BundleBuilder() {
  const totalSteps = bundleData.steps.length;

  return (
    <section aria-label="Bundle Builder Steps" className="flex flex-col gap-3">
      {bundleData.steps.map((step) => (
        <AccordionStep key={step.id} step={step} totalSteps={totalSteps} />
      ))}
    </section>
  );
}
