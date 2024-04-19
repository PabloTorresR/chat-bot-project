// import * as React from 'react';

import { AppRoutes } from '@chat-app/routes';
import { TopLevelProviders } from './top-level-providers';
import configureAmplify from '../config/amplify';
import { Suspense } from 'react';
import { LoadingPage } from './components/loading-page';

export const App = () => {
  configureAmplify();

  return (
    <TopLevelProviders>
      <Suspense fallback={<LoadingPage />}>
        <AppRoutes />
      </Suspense>
    </TopLevelProviders>
  );
};
