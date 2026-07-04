import { useCallback, useMemo } from 'react';

const STORAGE_KEY = 'bundle-builder-saved-system';

/**
 * Custom hook for persisting bundle state to localStorage.
 * Provides save, restore, clear, and hasSaved functionality.
 */
export function usePersistBundle() {
  const save = useCallback((state) => {
    try {
      const data = {
        cart: state.cart,
        selectedVariants: state.selectedVariants,
        activeStep: state.activeStep,
        savedAt: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Failed to save bundle state:', error);
      return false;
    }
  }, []);

  const restore = useCallback(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (error) {
      console.error('Failed to restore bundle state:', error);
      return null;
    }
  }, []);

  const clear = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return true;
    } catch (error) {
      console.error('Failed to clear bundle state:', error);
      return false;
    }
  }, []);

  const hasSaved = useMemo(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) !== null;
    } catch {
      return false;
    }
  }, []);

  return { save, restore, clear, hasSaved };
}
