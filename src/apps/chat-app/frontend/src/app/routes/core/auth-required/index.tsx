import React, { useCallback } from 'react';
import { Outlet } from 'react-router-dom';

import { ProtectedRoute } from '../protected';
import { WithChildren } from '@chat-app/types/with-children';
import {
  useAuthIsLoadingSelector,
  useIsLoggedInSelector,
} from '@chat-app/features/user/context/selectors/auth-manager';

interface Props extends WithChildren {}

export const AuthRequiredRoute = ({ children }: Props) => {
  const isLoggedIn = useIsLoggedInSelector();
  const isAuthLoading = useAuthIsLoadingSelector();

  const handleRedirect = useCallback(() => {
    //Enter side effect will redirecting to login page
  }, []);

  return (
    <ProtectedRoute isAllowed={isLoggedIn?.value || false} isLoading={isAuthLoading} onRedirect={handleRedirect}>
      {children || <Outlet />}
    </ProtectedRoute>
  );
};
