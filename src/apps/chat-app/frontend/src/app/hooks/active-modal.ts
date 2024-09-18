import { useCallback } from 'react';
import { useRadio } from './radio';

export const useActiveModal = <T extends string>() => {
  const { value, clear, set, isActive } = useRadio<T>();

  const isOpen = useCallback((name: T) => isActive(name), [isActive]);

  return {
    name: value,
    open: set,
    close: clear,
    isOpen,
  };
};
