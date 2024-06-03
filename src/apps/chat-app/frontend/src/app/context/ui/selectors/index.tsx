import { useContextSelector } from 'use-context-selector';
import { UiContext } from '..';

export const useIsSidebarExpandedSelector = () => useContextSelector(UiContext, state => state?.isSidebarExpanded);
