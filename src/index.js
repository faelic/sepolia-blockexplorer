import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import '@fontsource-variable/manrope';
import '@fontsource/ibm-plex-mono/400';
import '@fontsource/ibm-plex-mono/500';
import '@fontsource/ibm-plex-mono/600';
import './index.css';
import App from './App';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
