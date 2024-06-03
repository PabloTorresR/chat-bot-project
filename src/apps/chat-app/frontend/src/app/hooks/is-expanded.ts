import { useState } from 'react';

const useIsExpanded = (initialValue: boolean = false) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(initialValue);

  const toggle = () => {
    setIsExpanded(!isExpanded);
  };

  const setFalse = () => {
    setIsExpanded(false);
  };

  const setTrue = () => {
    setIsExpanded(true);
  };

  return {
    isExpanded,
    toggle,
    setFalse,
    setTrue,
  };
};

export default useIsExpanded;
