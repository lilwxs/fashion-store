'use client';
import { useAppDispatch } from '@/redux/hooks';
import { AppBar, Toolbar, Link as MuiLink, Typography, Box, Button } from '@mui/material';
import Link from 'next/link';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { toggleSideMenu } from '@/redux/slices/sideMenuSlice';
import { SideMenu } from '@/components/ui/SideMenu';

const OutShopLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  return (
    <AppBar>
      <Toolbar>
        <MuiLink component={Link} href='/' display='flex' alignItems='center'>
          <Typography variant='h6'>Next App |</Typography>
          <Typography sx={{ ml: 0.5, mt: 0.5 }}>Shop</Typography>
        </MuiLink>

        <Box flex={1} />

        <ThemeToggle />

        {/* <SideMenu /> */}

        <Button onClick={() => dispatch(toggleSideMenu())}>Menu</Button>
        {/* <main className='container'>{children}</main> */}
      </Toolbar>
    </AppBar>
  );
};

export default OutShopLayout;
