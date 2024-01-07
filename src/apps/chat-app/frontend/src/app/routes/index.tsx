import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainLayout } from '@app/layouts/main';
// import { NotFoundRoute } from '@app/routes/components/not-found';

const MAIN_ROUTE = '/';

export const AppRoutes = () => (
  <Routes>
    <Route path={MAIN_ROUTE} element={<MainLayout />}></Route>
    {/* NOTE: NOT FOUND ROUTE */}
    {/* <Route path="*" element={<NotFoundRoute />} /> */}
  </Routes>
);
