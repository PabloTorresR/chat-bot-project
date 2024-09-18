import { useCallback, useState } from 'react';

export const useRadio = <T extends string>(defaultValue?: T) => {
  const [value, setValue] = useState<T | undefined>(defaultValue);

  const set = useCallback((val: T | undefined) => {
    setValue(val);
  }, []);

  const clear = useCallback(() => {
    setValue(undefined);
  }, []);

  const toggle = useCallback(
    (val?: T) => {
      if (val === value) {
        clear();
      } else {
        setValue(val);
      }
    },
    [clear, value],
  );

  const isActive = useCallback((val: T) => value === val, [value]);

  return {
    value,
    set,
    clear,
    toggle,
    isActive,
  };
};
