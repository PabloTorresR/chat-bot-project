// import * as React from 'react';

import { AppRoutes } from '@chat-app/routes';
import { TopLevelProviders } from './top-level-providers';
import configureAmplify from '../config/amplify';

export const App = () => {
  configureAmplify();

  return (
    <TopLevelProviders>
      {/* TODO: loading page  */}
      {/* <Suspense fallback={<LoadingPage />}> */}
      <AppRoutes />
      {/* </Suspense> */}
    </TopLevelProviders>
  );
};
