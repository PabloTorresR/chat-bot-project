import { LoadingPage } from '@chat-app/components/loading-page';
import { RoutePath } from '@chat-app/routes/namespaces';
import { WithChildren } from '@chat-app/types/with-children';
import { useLayoutEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';

interface Props extends WithChildren {
  redirectTo?: string;
  isAllowed: boolean;
  onRedirect?: () => void;
  isLoading?: boolean;
}

export const ProtectedRoute = ({
  onRedirect = () => {},
  redirectTo = RoutePath.Route.SIGN_IN,
  isAllowed,
  isLoading = false,
  children,
}: Props): JSX.Element | null => {
  const redirected = useRef(false);

  useLayoutEffect(() => {
    if (!isAllowed && !redirected.current) {
      onRedirect();
      redirected.current = true;
      window.location.href = redirectTo;
    }
  }, [isAllowed, onRedirect, redirectTo]);

  return isLoading ? <LoadingPage /> : ((children || <Outlet />) as JSX.Element);
};
