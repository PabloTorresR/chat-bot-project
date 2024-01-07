import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app';

import '@app/styles/colors.scss';
import '@app/styles/main.scss';
import '@app/styles/variables.scss';
import '@app/styles/fonts.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
