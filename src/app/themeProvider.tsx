'use client';

import Navbar from '@/components/Navbar';
import { theme } from '@/styles/theme';
import themeStyledComponent from '@/styles/themeStyledComponent';
import { ThemeProvider } from '@mui/material';
import { useEffect, useState } from 'react';
import { ThemeProvider as ThemeProviderStyledComponents } from 'styled-components';
import Loading from './loading';

type ThemeProviderPageProps = {
  children: React.ReactNode;
};

const ThemeProviderPage = ({ children }: ThemeProviderPageProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (children) {
      setIsLoading(false);
    }
  }, [children]);

  return (
    <ThemeProvider theme={theme}>
      <ThemeProviderStyledComponents theme={themeStyledComponent}>
        {!isLoading ? (
          <>
            <Navbar />
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
