import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { UiProvider } from '@app/context/ui';
import { WithChildren } from './types/with-children';

export const TopLevelProviders = ({ children }: WithChildren) => (
  <BrowserRouter>
    <UiProvider>{children}</UiProvider>
  </BrowserRouter>
);
