'use client';
import { useContext, useState } from 'react';
import NextLink from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Input,
  InputAdornment,
  Link as MuiLink,
  Toolbar,
  Typography,
} from '@mui/material';
import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';

// import { CartContext, UiContext } from '../../context';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { toggleSideMenu } from '@/redux/slices/sideMenuSlice';
import { ThemeToggle } from './ThemeToggle';
import Link from 'next/link';

export const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const { numberOfItems } = useAppSelector((state) => state.cart);

  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;
    router.push(`/search/${searchTerm}`);
  };

  return (
    <AppBar>
      <Toolbar>
        <>
          <MuiLink component={Link} href='/' display='flex' alignItems='center'>
            <Typography variant='h6'>Next App |</Typography>
            <Typography sx={{ ml: 0.5, mt: 0.5 }}>Shop</Typography>
          </MuiLink>
        </>

        <Box flex={1} />

        <Box
          sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' } }}
          className='fadeIn'
        >
          <MuiLink component={Link} href='/category/men'>
            <Button color={pathname === '/category/men' ? 'primary' : 'info'}>Men</Button>
          </MuiLink>
          <MuiLink component={Link} href='/category/women'>
            <Button color={pathname === '/category/women' ? 'primary' : 'info'}>Women</Button>
          </MuiLink>
          <MuiLink component={Link} href='/category/kid'>
            <Button color={pathname === '/category/kid' ? 'primary' : 'info'}>Children</Button>
          </MuiLink>
        </Box>

        <Box flex={1} />

        {/* Screens large screens*/}
        {isSearchVisible ? (
          <Input
            sx={{ display: { xs: 'none', sm: 'flex' } }}
            className='fadeIn'
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => (e.key === 'Enter' ? onSearchTerm() : null)}
            type='text'
            placeholder='Search...'
            endAdornment={
              <InputAdornment position='end'>
                <IconButton onClick={() => setIsSearchVisible(false)}>
                  <ClearOutlined />
                </IconButton>
              </InputAdornment>
            }
          />
        ) : (
          <IconButton
            onClick={() => setIsSearchVisible(true)}
            className='fadeIn'
            sx={{ display: { xs: 'none', sm: 'flex' } }}
          >
            <SearchOutlined />
          </IconButton>
        )}

        {/* small screens */}
        <IconButton
          sx={{ display: { xs: 'flex', sm: 'none' } }}
          onClick={() => dispatch(toggleSideMenu())}
        >
          <SearchOutlined />
        </IconButton>

        <MuiLink component={Link} href='/cart'>
          <IconButton>
            <Badge badgeContent={numberOfItems > 9 ? '+9' : numberOfItems} color='secondary'>
              <ShoppingCartOutlined />
            </Badge>
          </IconButton>
        </MuiLink>
        <ThemeToggle />

        <Button onClick={() => dispatch(toggleSideMenu())}>Menu</Button>
      </Toolbar>
    </AppBar>
  );
};
