'use client';
import { FC, useContext } from 'react';
import {
  Box,
  Link as MuiLink,
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import { ICartProduct } from '@/interfaces/cart';
import { IOrderItem } from '@/interfaces/order';
import { ItemCounter } from '../ui/ItemCounter';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import Link from 'next/link';
import { removeCartProduct, updateCartQuantity } from '@/redux/slices/cartSlice';

interface Props {
  editable?: boolean;
  products?: IOrderItem[];
}

export const CartList: FC<Props> = ({ editable = false, products }) => {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cart);

  const onNewCartQuantityValue = (product: ICartProduct, newQuantityValue: number) => {
    const updatedProduct = { ...product, quantity: newQuantityValue };

    dispatch(updateCartQuantity(updatedProduct));
  };

  const productsToShow = products ? products : cart;

  return (
    <>
      {productsToShow.map((product) => (
        <Grid container spacing={2} key={product.slug + product.size} sx={{ mb: 1 }}>
          <Grid item xs={3}>
            {/* TODO: take to product page*/}
            <MuiLink component={Link} href={`/product/${product.slug}`}>
              <CardActionArea>
                <CardMedia image={product.image} component='img' sx={{ borderRadius: '5px' }} />
              </CardActionArea>
            </MuiLink>
          </Grid>
          <Grid item xs={7}>
            <Box display='flex' flexDirection='column'>
              <Typography variant='body1'>{product.title}</Typography>
              <Typography variant='body1'>
                Size: <strong>{product.size}</strong>
              </Typography>

              {editable ? (
                <ItemCounter
                  currentValue={product.quantity}
                  maxValue={10}
                  updatedQuantity={(value) =>
                    onNewCartQuantityValue(product as ICartProduct, value)
                  }
                />
              ) : (
                <Typography variant='h5'>
                  {product.quantity} {product.quantity > 1 ? 'products' : 'product'}
                </Typography>
              )}
            </Box>
          </Grid>
          <Grid item xs={2} display='flex' alignItems='center' flexDirection='column'>
            <Typography variant='subtitle1'>{`$${product.price}`}</Typography>

            {editable && (
              <Button
                variant='text'
                color='secondary'
                onClick={() => dispatch(removeCartProduct(product as ICartProduct))}
              >
                Remove
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  );
};
