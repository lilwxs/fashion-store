'use client';
import { RemoveShoppingCartOutlined } from '@mui/icons-material';
import { Box, Typography, Link as MuiLink } from '@mui/material';
import { ShopLayout } from '@/components/layouts/ShopLayout';
import Link from 'next/link';
import { useEffect } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';

const EmptyPage = () => {
  const { cart } = useAppSelector((state) => state.cart);
  const router = useRouter();

  useEffect(() => {
    if (cart && cart.length > 0) {
      router.replace('/cart');
    }
  }, [cart, router]);

  return (
    <ShopLayout>
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        height='calc(100vh - 200px)'
        sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
      >
        <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />
        <Box display='flex' flexDirection='column' alignItems='center'>
          <Typography>Your cart is empty</Typography>
          <MuiLink component={Link} href='/' typography='h4' color='secondary'>
            Go back
          </MuiLink>
        </Box>
      </Box>
    </ShopLayout>
  );
};

export default EmptyPage;
