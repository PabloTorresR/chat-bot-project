import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { WithChildren } from './types/with-children';
import { UiProvider } from '@chat-app/context/ui';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../config/react-query';
import { UserProvider } from './features/user/context/user';

export const TopLevelProviders = ({ children }: WithChildren) => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <UserProvider>
        <UiProvider>{children}</UiProvider>
      </UserProvider>
    </BrowserRouter>
  </QueryClientProvider>
);
