import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { WithChildren } from './types/with-children';
import { UiProvider } from '@chat-app/context/ui';
import { QueryClientProvider } from 'react-query';
import { queryClient } from '../config/react-query';

export const TopLevelProviders = ({ children }: WithChildren) => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <UiProvider>{children}</UiProvider>
    </BrowserRouter>
  </QueryClientProvider>
);
