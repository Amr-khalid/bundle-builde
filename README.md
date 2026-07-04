# Frontend Take-Home: Bundle Builder (Test ID: 41858)

A production-quality React + Vite implementation of the multi-step security system Bundle Builder. Faithfully reproduces the design while remaining fully responsive across desktop, tablet, and mobile layouts.

---

## 🌟 Project Overview

This app features a two-column desktop experience with a 4-step accordion builder on the left to configure a security system, alongside a live sticky review panel on the right summarizing selections, calculating prices, discounts, and installment breakdowns. The app is completely data-driven and includes client-side persistence so users can restore their built configuration on return.

### Core Features
1. **Interactive Accordion Steps**: Step 1 is expanded on load; only one step can be open at a time; navigating using headers or "Next" button updates selection context.
2. **Dynamic Variant and Quantity Selection**: Product cards support independent variant quantity tracking (e.g. Red and Blue versions of a product track different quantities). The active stepper binds to the selected variant.
3. **Live Sync Review Panel**: Quantity modifications inside the review panel synchronize instantly back to the product cards and update the pricing totals.
4. **Calculations via Selectors**: Derived calculations (totals, savings, section items) are computed centrally using modular selector functions.
5. **Persistence**: "Save my system for later" uses local storage to save, restore, and clear configurations.
6. **Responsive Layouts**: Desktop two-column layout switches to single-column stacking on tablets/mobiles, with optimized mobile viewports.
7. **Accessibility (a11y)**: Built with semantic markup, custom focus states, explicit ARIA tags (`aria-expanded`, `aria-label`, `aria-controls`), and full keyboard support (`tabindex` and `Enter`/`Space` handlers).
8. **Performance**: Optimized rendering with `React.memo` for list items/cards, `useMemo` for derived states, and `useCallback` for event handlers.

---

## 📂 Folder Structure

The project implements a **feature-based architecture** that decouples logic, context, and shared UI assets:

```
src/
├── app/
├── context/
│   └── BundleContext.jsx          # Global Context + Reducer State
├── data/
│   └── bundleData.json            # Single data source (Steps, Products, Variants)
├── features/
│   ├── bundle-builder/
│   │   ├── components/
│   │   │   ├── AccordionStep.jsx  # Stepper step header & collapsible body
│   │   │   ├── ProductCard.jsx    # Product cards with image, info, and controls
│   │   │   ├── ProductGrid.jsx    # Grid wrapper for step products
│   │   │   └── VariantSelector.jsx# Color selection swatches
│   │   ├── selectors.js           # Derived calculation functions (no in-component math)
│   │   └── index.jsx              # Main bundle builder component
│   └── review-panel/
│       ├── components/
│       │   ├── ReviewLineItem.jsx # Single selected item row
│       │   ├── ReviewSection.jsx  # Category header grouped lines
│       │   ├── ReviewSummary.jsx  # Totals, shipping, financing details
│       │   └── SaveSystem.jsx     # Save link + success toast
│       └── index.jsx              # Main review panel layout
├── shared/
│   ├── components/
│   │   ├── Badge.jsx              # Discount badge label
│   │   └── QuantityStepper.jsx    # Synchronized quantity control
│   ├── hooks/
│   │   └── usePersistBundle.js    # LocalStorage hook
│   └── utils/
│       └── formatCurrency.js      # USD Currency formatting helper
├── App.jsx                        # Layout composition and context mount check
├── index.css                      # Global Tailwind V4 setup + custom theme tokens
└── main.jsx                       # React DOM entry point
```

---

## 🛠️ Setup & Run Instructions

Ensure you have **Node.js** (v18+) and **npm** installed.

### 1. Clone & Install Dependencies
```bash
# Clone the repository
git clone https://github.com/Amr-khalid/bundle-builde.git
cd bundle-builde

# Install required dependencies
npm install
```

### 2. Run Locally in Development Mode
```bash
npm run dev
```
Open your browser and navigate to the address listed in your terminal (typically `http://localhost:5173`).

### 3. Run Production Build & Preview
To verify bundle size, lint cleanliness, and compile production assets:
```bash
# Run ESLint validation check
npm run lint

# Auto-format files with Prettier
npm run format

# Compile production assets
npm run build

# Preview production build locally
npm run preview
```

---

## 📐 Architecture & State Management Decisions

### Cart State Design
The state uses a flat `cart` map of `variantId: quantity` pairs inside the reducer:
```javascript
state = {
  activeStep: 0,
  cart: {
    "wyze-cam-v4-white": 1,
    "wyze-cam-pan-v3-white": 1
  },
  selectedVariants: {
    "wyze-cam-v4": "wyze-cam-v4-white"
  }
}
```
This flat map allows for $O(1)$ lookups, and simplifies synchronized stepper edits on both product card views and review panel line lists.

### Derived Calculations via Selectors
To prevent redundant computations and ensure state calculations are centralized and testable, no price math is performed within React components. Instead, components invoke custom selector functions defined in `selectors.js` (e.g. `getSubtotal(cart)`, `getCompareTotal(cart)`, `getSavings(cart)`).

### Performance Optimization
- **`React.memo`**: Applied to rendering targets that re-render frequently, such as `ProductCard`, `ReviewLineItem`, and `QuantityStepper`.
- **`useMemo`**: Used for all group mappings, total calculations, and selected item filters.
- **`useCallback`**: Applied to state mutations (`increment`, `decrement`, `selectVariant`) passed to child controls, minimizing child re-renders.

---

## ⚖️ Trade-offs & Future Improvements

### Trade-offs
- **Self-contained Client Data**: Storing product lists in `bundleData.json` is convenient for a static frontend test. In a production app, these would be retrieved dynamically from a Shopify Storefront GraphQL API or backend database.
- **Vite's Rolldown Bundler**: Standard rollup setup was modified for ESLint flat config integration on Tailwind CSS v4's build output.

### Future Improvements
- **Shopify Storefront GraphQL Integration**: Hooking up the selectors directly to Shopify Cart API (`cartLinesAdd` and `cartLinesUpdate`) to sync this bundle builder in real-time with an active Shopify checkout session.
- **Framer Motion Transitions**: Adding advanced fluid height animations to the accordion panels using Framer Motion rather than basic CSS max-height transitions.
