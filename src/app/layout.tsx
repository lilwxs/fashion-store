import ReduxProvider from '@/redux/ReduxProvider';
import { Roboto } from 'next/font/google';
import type { Metadata } from 'next';
import ThemeRegistry from '@/theme/ThemeRegistry';
import ToasterContext from '@/context/ToasterContext';
import Logo from '/public/next.svg';
import '@/styles/globals.css';
import Footer from '@/components/ui/Footer';
import { AuthContext } from '@/context/AuthContext';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Fashion Store Pro | Shop Online By Ngân',
  description: 'Shop-online shopping service for all of your needs',
  icons: [{ rel: 'icon', url: Logo.src }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body suppressHydrationWarning={true} className={roboto.className}>
        <AuthContext>
          <ThemeRegistry>
            <ToasterContext />
            <ReduxProvider>
              <div className='w-full h-full flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white dark:bg-zinc-600'>
                <div className='relative isolate flex h-screen w-full flex-col items-center justify-center overflow-hidden'>
                  <div
                    className='absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'
                    aria-hidden='true'
                  >
                    <div className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'></div>
                  </div>
                  <div className='w-full h-full flex flex-col justify-items-center overflow-y-auto overflow-hidden px-40 py-10'>
                    {children}
                    <Footer />
                  </div>
                  <div
                    className='absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]'
                    aria-hidden='true'
                  >
                    <div className='relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]'></div>
                  </div>
                </div>
              </div>
            </ReduxProvider>
          </ThemeRegistry>
        </AuthContext>
      </body>
    </html>
  );
}
