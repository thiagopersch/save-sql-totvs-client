'use client';

import Navbar from '@/components/Navbar';
import GlobalStyles from '@/styles/global';
import { theme } from '@/styles/theme';
import themeStyledComponent from '@/styles/themeStyledComponent';
import { ThemeProvider } from '@mui/material';
import { useEffect, useState } from 'react';
import { ThemeProvider as ThemeProviderStyledComponents } from 'styled-components';
import './globals.css';
import Loading from './loading';

type ThemeProviderPageProps = {
  children: React.ReactNode;
};

const ThemeProviderPage = ({ children }: ThemeProviderPageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
    setIsLoading(false);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <ThemeProviderStyledComponents theme={themeStyledComponent}>
        <GlobalStyles />
        {!isLoading ? (
          <>
            {!!token && <Navbar />}
            {children}
          </>
        ) : (
          <Loading />
        )}
      </ThemeProviderStyledComponents>
    </ThemeProvider>
  );
};

export default ThemeProviderPage;
