'use client';
import { FC, useMemo, useState } from 'react';
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  Box,
  Typography,
  Link as MuiLink,
  Chip,
} from '@mui/material';
import { IProduct } from '@/interfaces/products';
import Link from 'next/link';

interface Props {
  product: IProduct;
}

const ProductCard: FC<Props> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const productImage = useMemo(() => {
    return isHovered ? product.images[1] : product.images[0];
  }, [isHovered, product.images]);

  return (
    <Grid
      item
      lg={2}
      md={3}
      xs={6}
      sm={4}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card>
        <MuiLink component={Link} href={`/product/${product.slug}`} passHref prefetch={false}>
          <CardActionArea>
            {product.inStock === 0 && (
              <Chip
                color='primary'
                label='Not available'
                sx={{ position: 'absolute', zIndex: 99, top: '10px', left: '10px' }}
              />
            )}

            <CardMedia
              component='img'
              className='fadeIn'
              image={productImage}
              alt={product.title}
              onLoad={() => setIsImageLoaded(true)}
            />
          </CardActionArea>
        </MuiLink>
      </Card>

      <Box sx={{ mt: 1, display: isImageLoaded ? 'block' : 'none' }} className='fadeIn'>
        <Typography fontWeight={700}>{product.title}</Typography>
        <Typography fontWeight={500}>{`${product.price} Tỷ`}</Typography>
      </Box>
    </Grid>
  );
};

export default ProductCard;
