// import * as React from 'react';

import { AppRoutes } from '@chat-app/routes';
import { TopLevelProviders } from './top-level-providers';

export const App = () => (
  <TopLevelProviders>
    {/* TODO: loading page  */}
    {/* <Suspense fallback={<LoadingPage />}> */}
    <AppRoutes />
    {/* </Suspense> */}
  </TopLevelProviders>
);
