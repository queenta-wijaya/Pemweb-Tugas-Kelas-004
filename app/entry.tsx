import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import AppRoutes from './routes';
import './globals.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Elemen root tidak ditemukan.');
}

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </StrictMode>
);
