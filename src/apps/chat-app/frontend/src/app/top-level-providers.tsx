import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { WithChildren } from './types/with-children';
import { UiProvider } from '@chat-app/context/ui';
import { QueryClient, QueryClientProvider } from 'react-query';

export const TopLevelProviders = ({ children }: WithChildren) => {
  //TODO: como hacía esto dimitry?
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <UiProvider>{children}</UiProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};
