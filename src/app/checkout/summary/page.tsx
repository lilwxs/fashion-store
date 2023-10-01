'use client';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import {
  Link as MuiLink,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  Chip,
} from '@mui/material';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { createOrder } from '@/redux/slices/cartSlice';
import { ShopLayout } from '@/components/layouts/ShopLayout';
import { CartList } from '@/components/cart/CartList';
import { OrderSummary } from '@/components/cart/OrderSummary';
import Link from 'next/link';
// import { countries } from '../../utils';

const SummaryPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { shippingAddress, numberOfItems } = useAppSelector((state) => state.cart);

  const [isPosting, setIsPosting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  //   useEffect(() => {
  //     if (!Cookies.get('firstName')) {
  //       router.push('/checkout/address');
  //     }
  //   }, [router]);

  const onCreateOrder = async () => {
    setIsPosting(true);

    // const { hasError, message } = await createOrder();

    // if ( hasError ) {
    //     setIsPosting(false);
    //     setErrorMessage( message );
    //     return;
    // }

    // dispatch(createOrder());

    // router.replace(`/orders/${message}`);
  };

  // if (!shippingAddress) {
  //   return <></>;
  // }

  const {
    firstName,
    lastName,
    address,
    address2 = '',
    city,
    country,
    phone,
    zip,
  } = shippingAddress;

  return (
    <ShopLayout>
      <Typography variant='h1' component='h1'>
        Order Summary
      </Typography>

      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className='summary-card'>
            <CardContent>
              <Typography variant='h2'>
                Summary ({numberOfItems} {numberOfItems === 1 ? 'product' : 'products'})
              </Typography>
              <Divider sx={{ my: 1 }} />

              <Box display='flex' justifyContent='space-between'>
                <Typography variant='subtitle1'>Delivery address</Typography>
                <MuiLink component={Link} href='/checkout/address' underline='always'>
                  To edit
                </MuiLink>
              </Box>

              <Typography>
                {firstName} {lastName}
              </Typography>
              <Typography>
                {address}
                {address2 ? `, ${address2}` : ''}{' '}
              </Typography>
              <Typography>
                {city}, {zip}
              </Typography>
              {/* <Typography>{ countries.find( c => c.code === country )?.name }</Typography> */}
              <Typography>{country}</Typography>
              <Typography>{phone}</Typography>

              <Divider sx={{ my: 1 }} />

              <Box display='flex' justifyContent='end'>
                <MuiLink component={Link} href='/cart' underline='always'>
                  To edit
                </MuiLink>
              </Box>

              <OrderSummary />

              <Box sx={{ mt: 3 }} display='flex' flexDirection='column'>
                <Button
                  color='secondary'
                  className='circular-btn'
                  fullWidth
                  onClick={onCreateOrder}
                  disabled={isPosting}
                >
                  Confirm Order
                </Button>

                <Chip
                  color='error'
                  label={errorMessage}
                  sx={{ display: errorMessage ? 'flex' : 'none', mt: 2 }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default SummaryPage;
