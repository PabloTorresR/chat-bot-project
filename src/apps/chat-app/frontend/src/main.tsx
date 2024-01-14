import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app';

import '@chat-app/styles/colors.scss';
import '@chat-app/styles/main.scss';
import '@chat-app/styles/variables.scss';
import '@chat-app/styles/fonts.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
