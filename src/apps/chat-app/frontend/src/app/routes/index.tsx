import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainLayout } from '@chat-app/layouts/main';
import { AuthRequiredRoute } from './core/auth-required';
import { RoutePath } from './namespaces';
import AuthRoutesWrapper from '@chat-app/features/user/components/sign-in.sign-up/components/auth-provider-wrapper';
// import { NotFoundRoute } from '@app/routes/components/not-found';

const SignInRoute = lazy(() => import('@chat-app/features/user/components/sign-in.sign-up/components/sign-in'));
const SignUpRoute = lazy(() => import('@chat-app/features/user/components/sign-in.sign-up/components/sign-up'));
const SignUpConfirmRoute = lazy(
  () => import('@chat-app/features/user/components/sign-in.sign-up/components/confirm-sign-up'),
);
const ConversationsRoute = lazy(() => import('@chat-app/routes/conversations'));
const CollectionRoute = lazy(() => import('@chat-app/routes/collection'));

//NOTE: replace login for the parent that includes it and also signup
export const AppRoutes = () => (
  <Routes>
    <Route
      path={RoutePath.Route.HOME}
      element={
        <AuthRequiredRoute>
          <MainLayout />
        </AuthRequiredRoute>
      }
    >
      <Route path={RoutePath.Route.CONVERSATIONS} element={<ConversationsRoute />} />
      <Route path={RoutePath.Route.COLLECTION} element={<CollectionRoute />} />
    </Route>
    <Route path={RoutePath.Route.AUTH} element={<AuthRoutesWrapper />}>
      <Route path={RoutePath.Route.SIGN_IN} element={<SignInRoute />}></Route>
      <Route path={RoutePath.Route.SIGN_UP} element={<SignUpRoute />}></Route>
      <Route path={RoutePath.Route.CONFIRM_SIGN_UP} element={<SignUpConfirmRoute />}></Route>
    </Route>
    {/* NOTE: NOT FOUND ROUTE */}
    {/* <Route path="*" element={<NotFoundRoute />} /> */}
  </Routes>
);
