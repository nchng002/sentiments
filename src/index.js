import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './global.css'
import { AppContextProvider } from './contexts/AppContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AppContextProvider>
);

