import { LoadingPage } from '@chat-app/components/loading-page';
import { RoutePath } from '@chat-app/routes/namespaces';
import { WithChildren } from '@chat-app/types/with-children';
import React, { useLayoutEffect, useRef } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

interface Props extends WithChildren {
  redirectTo?: string;
  isAllowed: boolean;
  onRedirect?: () => void;
  isLoading?: boolean;
}

export const ProtectedRoute = ({
  onRedirect = () => {},
  redirectTo = RoutePath.Route.LOGIN,
  isAllowed,
  isLoading = false,
  children,
}: Props): JSX.Element | null => {
  const navigate = useNavigate();
  const redirected = useRef(false);

  useLayoutEffect(() => {
    if (!isAllowed && !redirected.current) {
      onRedirect();
      redirected.current = true;
      navigate(redirectTo);
    }
  }, [isAllowed, navigate, onRedirect, redirectTo]);

  return isLoading ? <LoadingPage /> : ((children || <Outlet />) as JSX.Element);
};
