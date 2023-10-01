'use client';
import { Navbar } from '@/components/ui/Navbar';
import { SideMenu } from '@/components/ui/SideMenu';
import { Metadata } from 'next';
import React, { FC } from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ScrollToTop from 'react-scroll-to-top';
import useMediaQuery from '@mui/material/useMediaQuery';

interface Props {
  children: React.ReactNode;
  params?: any;
}

// export const metadata: Metadata = {
//   title: 'Next App | Shop',
//   description: 'Find the best Tesla products here',
// };

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  console.log('params', params);
  return {
    title: 'post.title',
  };
};

export const ShopLayout: FC<Props> = ({ children }) => {
  const matches = useMediaQuery('(min-width:768px)');
  return (
    <>
      <nav>
        <Navbar />
      </nav>

      <SideMenu />

      <main className='container'>{children}</main>
      {matches && (
        <ScrollToTop smooth component={<ArrowUpwardIcon color='primary' />}>
          ArrowUpwardIcon
        </ScrollToTop>
      )}
    </>
  );
};
