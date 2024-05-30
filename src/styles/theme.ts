import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0DA6A6',
      light: '#3DD5D6',
      // dark: "#004747",
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#FF0031',
      light: '#F0758D',
      dark: '#99001D',
    },
    warning: {
      main: '#FFB946',
    },
    success: {
      main: '#2ED47A',
    },
    common: {
      black: '#1A1A1A',
      white: '#FFFFFF',
    },
  },
});
