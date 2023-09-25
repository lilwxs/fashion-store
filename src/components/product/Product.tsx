'use client';
import { FC, useState } from 'react';
import { ICartProduct } from '@/interfaces/cart';
import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { SizeSelector } from '../products/SizeSelector';
import { ItemCounter } from '../ui/ItemCounter';
import ProductSlideshow from '../products/ProductSlideshow';
import { IProduct, ISize } from '@/interfaces/products';
import { useRouter } from 'next/navigation';

interface Props {
  product: IProduct;
}

const Product: FC<Props> = ({ product }) => {
  const router = useRouter();
  const [showMessage, setShowMessage] = useState(false);

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1,
  });

  const selectedSize = (size: ISize) => {
    setTempCartProduct((currentProduct) => ({
      ...currentProduct,
      size,
    }));
  };

  const onUpdateQuantity = (quantity: number) => {
    setTempCartProduct((currentProduct) => ({
      ...currentProduct,
      quantity,
    }));
  };

  const onAddProduct = () => {
    if (!tempCartProduct.size) {
      setShowMessage(true);
      return;
    }

    //   addProductToCart(tempCartProduct);
    router.push('/cart');
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={7}>
        <ProductSlideshow images={product.images} />
      </Grid>

      <Grid item xs={12} sm={5}>
        <Box display='flex' flexDirection='column'>
          {/* Titles */}
          <Typography variant='h1' component='h1'>
            {product.title}
          </Typography>
          <Typography variant='subtitle1' component='h2'>{`$${product.price}`}</Typography>

          {/* Amount */}
          <Box sx={{ my: 2 }}>
            <Typography variant='subtitle2'>Amount</Typography>
            <ItemCounter
              currentValue={tempCartProduct.quantity}
              updatedQuantity={onUpdateQuantity}
              maxValue={product.inStock > 10 ? 10 : product.inStock}
            />
            <SizeSelector
              // selectedSize={ product.sizes[2] }
              sizes={product.sizes}
              selectedSize={tempCartProduct.size}
              onSelectedSize={selectedSize}
            />
          </Box>

          {/*Add to cart */}
          {showMessage && (
            <Typography color='red' variant='body2'>
              Choose the size you need
            </Typography>
          )}
          {product.inStock > 0 ? (
            <Button color='secondary' className='circular-btn' onClick={onAddProduct}>
              {tempCartProduct.size ? 'Add to cart' : 'Select a size'}
            </Button>
          ) : (
            <Chip label='Not available' color='error' variant='outlined' />
          )}

          {/* Description */}
          <Box sx={{ mt: 3 }}>
            <Typography variant='subtitle2'>Description</Typography>
            <Typography variant='body2'>{product.description}</Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Product;
