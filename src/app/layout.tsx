import ReduxProvider from '@/redux/ReduxProvider';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ThemeRegistry from '@/ThemeRegistry/ThemeRegistry';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next Shop App',
  description: 'Shop-online shopping service for all of your needs',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body suppressHydrationWarning={true}>
        <ThemeRegistry>
          <ReduxProvider>{children}</ReduxProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
