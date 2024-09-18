import { NotificationBannerProps } from '@chat-app/components/notification-banner/components/primitive-banner';
import { START_UP_BANNER } from '@chat-app/components/notification-banner/constants';
import { ModalName } from '@chat-app/enums/index';
import { useActiveModal } from '@chat-app/hooks/active-modal';
import useIsExpanded from '@chat-app/hooks/is-expanded';
import { WithChildren } from '@chat-app/types/with-children';
import { useState } from 'react';
import { createContext } from 'use-context-selector';

const useContextData = () => {
  const { isExpanded: isSidebarExpanded, toggle: toggleIsSidebarExpanded } = useIsExpanded(true);
  const activeModal = useActiveModal<ModalName>();
  const [banner, setBanner] = useState<NotificationBannerProps | null>(START_UP_BANNER);

  return {
    isSidebarExpanded: {
      value: isSidebarExpanded,
      actions: { toggleIsSidebarExpanded },
    },
    activeModal,
    banner: {
      value: banner,
      setValue: setBanner,
    },
  };
};

type TContext = ReturnType<typeof useContextData>;

export const UiContext = createContext<TContext | undefined>(undefined);

export const UiProvider = ({ children }: WithChildren) => {
  const data = useContextData();

  return <UiContext.Provider value={data}>{children}</UiContext.Provider>;
};
