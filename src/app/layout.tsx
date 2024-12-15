import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ThemeProviderPage from './themeProvider';

const roboto = Roboto({ subsets: ['latin'], weight: '500' });

export const metadata: Metadata = {
  title: 'Integração com TOTVS RM',
  description: 'Generated by Peixola',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${roboto.className} flex flex-col min-h-full min-w-full`}
      >
        <AppRouterCacheProvider>
          <ThemeProviderPage>
            {children}
            <ToastContainer />
          </ThemeProviderPage>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
