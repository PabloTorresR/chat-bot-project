import { useIsLoggedInSelector } from '@chat-app/features/user/context/selectors/auth-manager';
import { RoutePath } from '@chat-app/routes/namespaces';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const AuthRoutesWrapper = () => {
  const isLoggedIn = useIsLoggedInSelector();

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn?.value) {
      navigate(RoutePath.Route.HOME);
    }
  }, [isLoggedIn, navigate]);

  return <Outlet />;
};

export default AuthRoutesWrapper;
