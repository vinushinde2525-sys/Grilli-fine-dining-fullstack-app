import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

import { store } from './store';
import { SocketProvider } from './context/SocketContext';
import App from './App';
import './index.css';

var queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      retryDelay: 1000,
      staleTime: 0,                 // always consider data stale → refetch on mount
      gcTime: 5 * 60 * 1000,       // 5 minutes cache
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    },
    mutations: {
      retry: 0,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <SocketProvider>
            <App />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#1a1c1e',
                  color: '#ffffff',
                  border: '1px solid rgba(201,169,110,0.3)',
                  borderRadius: '0',
                  fontFamily: 'var(--font-body, sans-serif)',
                  fontSize: '13px',
                },
                success: { iconTheme: { primary: 'hsl(38,61%,73%)', secondary: '#111' } },
                error:   { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
              }}
            />
          </SocketProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
