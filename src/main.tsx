import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import AppProvider from './Context/AppProvider';

ReactDOM
  .createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <AppProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppProvider>,
  );
