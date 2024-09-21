import { Suspense, useEffect, lazy } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useIsLoggedInSelector } from '@chat-app/features/user/context/selectors/auth-manager';
import { RoutePath } from '@chat-app/routes/namespaces';

const MobileFallback = lazy(() => import(/* webpackChunkName: "MobileFallback" */ '@chat-app/layouts/mobile-fallback'));

const AuthRoutesWrapper = () => {
  const isLoggedIn = useIsLoggedInSelector();

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn?.value) {
      navigate(RoutePath.Route.HOME);
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <Suspense fallback={null}>
        <MobileFallback />
      </Suspense>
      <Outlet />
    </>
  );
};

export default AuthRoutesWrapper;
