'use client';
import { useContext, useEffect } from 'react';

import { Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';

import { ShopLayout } from '@/components/layouts/ShopLayout';
import { CartList } from '@/components/cart/CartList';
import { OrderSummary } from '@/components/cart/OrderSummary';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks';

const CartPage = () => {
  const { cart } = useAppSelector((state) => state.cart);
  const router = useRouter();

  useEffect(() => {
    if (cart && cart.length === 0) {
      router.replace('/cart/empty');
    }
  }, [cart, router]);

  if (cart.length === 0) {
    return (
      <ShopLayout>
        <Typography variant='h1' component='h1'></Typography>
      </ShopLayout>
    );
  }

  return (
    <ShopLayout>
      <Typography variant='h1' component='h1'>
        Cart
      </Typography>

      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList editable />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className='summary-card'>
            <CardContent>
              <Typography variant='h2'>Order</Typography>
              <Divider sx={{ my: 1 }} />

              <OrderSummary />

              <Box sx={{ mt: 3 }}>
                <Button
                  color='secondary'
                  className='circular-btn'
                  fullWidth
                  href='/checkout/address'
                >
                  Checkout
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default CartPage;
