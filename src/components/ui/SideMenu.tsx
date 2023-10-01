'use client';
import { useContext, useState } from 'react';

import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import {
  AccountCircleOutlined,
  AdminPanelSettings,
  CategoryOutlined,
  ConfirmationNumberOutlined,
  EscalatorWarningOutlined,
  FemaleOutlined,
  LoginOutlined,
  MaleOutlined,
  SearchOutlined,
  VpnKeyOutlined,
  DashboardOutlined,
} from '@mui/icons-material';

// import { UiContext, AuthContext } from '../../context';
import { usePathname, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { toggleSideMenu } from '@/redux/slices/sideMenuSlice';
import { signOut, useSession } from 'next-auth/react';

export const SideMenu = () => {
  const router = useRouter();
  const pathname = usePathname();
  // const { isMenuOpen, toggleSideMenu } = useContext( UiContext );
  const { data: session } = useSession();

  const isOpenSideMenu = useAppSelector((state) => state.sideMenu.isOpenSideMenu);
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;
    navigateTo(`/search/${searchTerm}`);
  };

  const navigateTo = (url: string) => {
    dispatch(toggleSideMenu());
    router.push(url);
  };

  return (
    <Drawer
      open={isOpenSideMenu}
      anchor='right'
      sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
      onClose={() => dispatch(toggleSideMenu())}
    >
      <Box sx={{ width: 250, paddingTop: 5 }}>
        <List>
          <ListItem>
            <Input
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => (e.key === 'Enter' ? onSearchTerm() : null)}
              type='text'
              placeholder='Search...'
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton onClick={onSearchTerm}>
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          </ListItem>

          {session && (
            <>
              <ListItem button>
                <ListItemIcon>
                  <AccountCircleOutlined />
                </ListItemIcon>
                <ListItemText primary={'Profile'} />
              </ListItem>

              <ListItem button onClick={() => navigateTo('/orders/history')}>
                <ListItemIcon>
                  <ConfirmationNumberOutlined />
                </ListItemIcon>
                <ListItemText primary={'My Orders'} />
              </ListItem>
            </>
          )}

          <ListItem
            button
            sx={{ display: { xs: '', sm: 'none' } }}
            onClick={() => navigateTo('/category/men')}
          >
            <ListItemIcon>
              <MaleOutlined />
            </ListItemIcon>
            <ListItemText primary={'Men'} />
          </ListItem>

          <ListItem
            button
            sx={{ display: { xs: '', sm: 'none' } }}
            onClick={() => navigateTo('/category/women')}
          >
            <ListItemIcon>
              <FemaleOutlined />
            </ListItemIcon>
            <ListItemText primary={'Women'} />
          </ListItem>

          <ListItem
            button
            sx={{ display: { xs: '', sm: 'none' } }}
            onClick={() => navigateTo('/category/kid')}
          >
            <ListItemIcon>
              <EscalatorWarningOutlined />
            </ListItemIcon>
            <ListItemText primary={'Children'} />
          </ListItem>

          {session ? (
            <ListItem button onClick={() => signOut()}>
              <ListItemIcon>
                <LoginOutlined />
              </ListItemIcon>
              <ListItemText primary={'Sign out'} />
            </ListItem>
          ) : (
            <ListItem button onClick={() => navigateTo(`/auth/login?p=${pathname}`)}>
              <ListItemIcon>
                <VpnKeyOutlined />
              </ListItemIcon>
              <ListItemText primary={'Sign in'} />
            </ListItem>
          )}

          {/* Admin */}
          {/* {user?.role === 'admin' && ( */}
          <>
            <Divider />
            <ListSubheader>Admin Panel</ListSubheader>

            <ListItem button onClick={() => navigateTo('/admin/')}>
              <ListItemIcon>
                <DashboardOutlined />
              </ListItemIcon>
              <ListItemText primary={'Dashboard'} />
            </ListItem>

            <ListItem button onClick={() => navigateTo('/admin/products')}>
              <ListItemIcon>
                <CategoryOutlined />
              </ListItemIcon>
              <ListItemText primary={'Products'} />
            </ListItem>
            <ListItem button onClick={() => navigateTo('/admin/orders')}>
              <ListItemIcon>
                <ConfirmationNumberOutlined />
              </ListItemIcon>
              <ListItemText primary={'Orders'} />
            </ListItem>

            <ListItem button onClick={() => navigateTo('/admin/users')}>
              <ListItemIcon>
                <AdminPanelSettings />
              </ListItemIcon>
              <ListItemText primary={'Users'} />
            </ListItem>
          </>
          {/* )} */}
        </List>
      </Box>
    </Drawer>
  );
};
