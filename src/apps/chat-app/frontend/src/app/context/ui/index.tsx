import { WithChildren } from 'app/types/with-children';
import React, { useState } from 'react';
import { createContext } from 'use-context-selector';

const useContextData = () => {
  const [state, setState] = useState();
  return {
    state: {
      value: state,
      actions: { setState },
    },
  };
};

type TContext = ReturnType<typeof useContextData>;

export const UiContext = createContext<TContext | undefined>(undefined);

export const UiProvider = ({ children }: WithChildren) => {
  const data = useContextData();

  return <UiContext.Provider value={data}>{children}</UiContext.Provider>;
};
