import { createContext, useContext, useReducer, useCallback } from 'react';
import bundleData from '../data/bundleData.json';

// Action types
const ACTIONS = {
  SET_STEP: 'SET_STEP',
  SET_QUANTITY: 'SET_QUANTITY',
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  SELECT_VARIANT: 'SELECT_VARIANT',
  LOAD_STATE: 'LOAD_STATE',
  RESET: 'RESET',
};

// Initial state from bundleData.json
const initialState = {
  activeStep: bundleData.initialSelections.activeStep,
  cart: { ...bundleData.initialSelections.cart },
  selectedVariants: { ...bundleData.initialSelections.selectedVariants },
};

function bundleReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_STEP:
      return {
        ...state,
        activeStep: action.payload,
      };

    case ACTIONS.SET_QUANTITY:
      return {
        ...state,
        cart: {
          ...state.cart,
          [action.payload.variantId]: Math.max(0, action.payload.quantity),
        },
      };

    case ACTIONS.INCREMENT:
      return {
        ...state,
        cart: {
          ...state.cart,
          [action.payload]: (state.cart[action.payload] || 0) + 1,
        },
      };

    case ACTIONS.DECREMENT: {
      const currentQty = state.cart[action.payload] || 0;
      return {
        ...state,
        cart: {
          ...state.cart,
          [action.payload]: Math.max(0, currentQty - 1),
        },
      };
    }

    case ACTIONS.SELECT_VARIANT:
      return {
        ...state,
        selectedVariants: {
          ...state.selectedVariants,
          [action.payload.productId]: action.payload.variantId,
        },
      };

    case ACTIONS.LOAD_STATE:
      return {
        ...state,
        activeStep: action.payload.activeStep ?? state.activeStep,
        cart: action.payload.cart ?? state.cart,
        selectedVariants:
          action.payload.selectedVariants ?? state.selectedVariants,
      };

    case ACTIONS.RESET:
      return { ...initialState };

    default:
      return state;
  }
}

// Context
const BundleContext = createContext(null);

export function BundleProvider({ children }) {
  const [state, dispatch] = useReducer(bundleReducer, initialState);

  const setStep = useCallback((step) => {
    dispatch({ type: ACTIONS.SET_STEP, payload: step });
  }, []);

  const setQuantity = useCallback((variantId, quantity) => {
    dispatch({
      type: ACTIONS.SET_QUANTITY,
      payload: { variantId, quantity },
    });
  }, []);

  const increment = useCallback((variantId) => {
    dispatch({ type: ACTIONS.INCREMENT, payload: variantId });
  }, []);

  const decrement = useCallback((variantId) => {
    dispatch({ type: ACTIONS.DECREMENT, payload: variantId });
  }, []);

  const selectVariant = useCallback((productId, variantId) => {
    dispatch({
      type: ACTIONS.SELECT_VARIANT,
      payload: { productId, variantId },
    });
  }, []);

  const loadState = useCallback((savedState) => {
    dispatch({ type: ACTIONS.LOAD_STATE, payload: savedState });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: ACTIONS.RESET });
  }, []);

  const value = {
    state,
    setStep,
    setQuantity,
    increment,
    decrement,
    selectVariant,
    loadState,
    reset,
  };

  return (
    <BundleContext.Provider value={value}>{children}</BundleContext.Provider>
  );
}

export function useBundle() {
  const context = useContext(BundleContext);
  if (!context) {
    throw new Error('useBundle must be used within a BundleProvider');
  }
  return context;
}

export { ACTIONS };
