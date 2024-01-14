import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { WithChildren } from './types/with-children';
import { UiProvider } from '@chat-app/context/ui';

export const TopLevelProviders = ({ children }: WithChildren) => (
  <BrowserRouter>
    <UiProvider>{children}</UiProvider>
  </BrowserRouter>
);
