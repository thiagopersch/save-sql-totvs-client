"use client";

import { theme } from "@/styles/theme";
import themeStyledComponent from "@/styles/themeStyledComponent";
import { ThemeProvider } from "@mui/material";
import { ThemeProvider as ThemeProviderStyledComponents } from "styled-components";

type ThemeProviderPageProps = {
  children: React.ReactNode;
};

const ThemeProviderPage = ({ children }: ThemeProviderPageProps) => {
  return (
    <ThemeProvider theme={theme}>
      <ThemeProviderStyledComponents theme={themeStyledComponent}>
        {children}
      </ThemeProviderStyledComponents>
    </ThemeProvider>
  );
};

export default ThemeProviderPage;
