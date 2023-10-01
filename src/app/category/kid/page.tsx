'use client';
import type { NextPage } from 'next';
import { Typography } from '@mui/material';
import { ShopLayout } from '@/components/layouts/ShopLayout';
import { FullScreenLoading } from '@/components/ui/FullScreenLoading';
import ProductList from '@/components/products/ProductList';
import { useProducts } from '@/hooks/useProducts';

const KidPage: NextPage = () => {
  const { products, isLoading } = useProducts('/products?gender=kid');

  return (
    <ShopLayout>
      <Typography variant='h1' component='h1'>
        Children
      </Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>
        Products for children
      </Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default KidPage;
