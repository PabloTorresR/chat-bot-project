import { useContextSelector } from 'use-context-selector';
import { UserContext } from '../user';
import { useAuthManager } from '../../hooks/auth-manager';

export const useIsLoggedInSelector = () => useContextSelector(UserContext, state => state?.authManager.isLoggedIn);
export const useAuthIsLoadingSelector = () => useContextSelector(UserContext, state => state?.authManager.isLoading);
export const useAuthActionsSelector = () =>
  useContextSelector(UserContext, state => state?.authManager.actions) as ReturnType<typeof useAuthManager>['actions'];
