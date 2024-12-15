'use client';

import ContentAuth from '@/components/ContentAuth';
import NextAuthSessionProvider from '@/providers/sessionProvider';
import GlobalStyles from '@/styles/global';
import { theme } from '@/styles/theme';
import themeStyledComponent from '@/styles/themeStyledComponent';
import { ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider as ThemeProviderStyledComponents } from 'styled-components';
import { AuthProvider } from './AuthContext';
import './globals.css';
import Loading from './loading';

type ThemeProviderPageProps = {
  children: React.ReactNode;
};

const ThemeProviderPage = ({ children }: ThemeProviderPageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = new QueryClient();

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <NextAuthSessionProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <ThemeProviderStyledComponents theme={themeStyledComponent}>
              <GlobalStyles />
              {isLoading ? (
                <Loading />
              ) : (
                <ContentAuth>
                  {children}
                  <ToastContainer
                    position="bottom-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    theme="colored"
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    limit={2}
                    style={{ width: 'auto', maxWidth: '60dvw' }}
                  />
                </ContentAuth>
              )}
            </ThemeProviderStyledComponents>
          </ThemeProvider>
        </QueryClientProvider>
      </AuthProvider>
    </NextAuthSessionProvider>
  );
};

export default ThemeProviderPage;
