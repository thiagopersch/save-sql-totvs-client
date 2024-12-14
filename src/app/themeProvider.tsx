'use client';

import ContentAuth from '@/components/ContentAuth';
import GlobalStyles from '@/styles/global';
import { theme } from '@/styles/theme';
import themeStyledComponent from '@/styles/themeStyledComponent';
import { ThemeProvider } from '@mui/material';
import { useEffect, useState } from 'react';
import { ThemeProvider as ThemeProviderStyledComponents } from 'styled-components';
import { AuthProvider } from './AuthContext';
import './globals.css';
import Loading from './loading';

type ThemeProviderPageProps = {
  children: React.ReactNode;
};

const ThemeProviderPage = ({ children }: ThemeProviderPageProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <ThemeProviderStyledComponents theme={themeStyledComponent}>
        <AuthProvider>
          <GlobalStyles />
          {isLoading ? <Loading /> : <ContentAuth>{children}</ContentAuth>}
        </AuthProvider>
      </ThemeProviderStyledComponents>
    </ThemeProvider>
  );
};

export default ThemeProviderPage;
