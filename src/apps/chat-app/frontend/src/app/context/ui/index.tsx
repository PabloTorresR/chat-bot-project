import useIsExpanded from '@chat-app/hooks/is-expanded';
import { WithChildren } from '@chat-app/types/with-children';
import React from 'react';
import { createContext } from 'use-context-selector';

const useContextData = () => {
  const { isExpanded: isSidebarExpanded, toggle: toggleIsSidebarExpanded } = useIsExpanded(true);
  return {
    isSidebarExpanded: {
      value: isSidebarExpanded,
      actions: { toggleIsSidebarExpanded },
    },
  };
};

type TContext = ReturnType<typeof useContextData>;

export const UiContext = createContext<TContext | undefined>(undefined);

export const UiProvider = ({ children }: WithChildren) => {
  const data = useContextData();

  return <UiContext.Provider value={data}>{children}</UiContext.Provider>;
};
