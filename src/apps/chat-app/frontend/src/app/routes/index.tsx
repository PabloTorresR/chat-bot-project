import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainLayout } from '@chat-app/layouts/main';
import { AuthRequiredRoute } from './core/auth-required';
import { RouteName } from './namespaces';
import SignIn from '@chat-app/features/user/components/sign-in.sign-up/components/sign-in';
// import { NotFoundRoute } from '@app/routes/components/not-found';

//NOTE: replace login for the parent that includes it and also signup
export const AppRoutes = () => (
  <Routes>
    <Route path={RouteName.LOGIN} element={<SignIn />}></Route>
    <Route
      path={RouteName.HOME}
      element={
        <AuthRequiredRoute>
          <MainLayout />
        </AuthRequiredRoute>
      }
    ></Route>
    {/* NOTE: NOT FOUND ROUTE */}
    {/* <Route path="*" element={<NotFoundRoute />} /> */}
  </Routes>
);
