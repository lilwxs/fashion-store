'use client';
import type { NextPage } from 'next';
import { Typography } from '@mui/material';
import { FullScreenLoading } from '@/components/ui/FullScreenLoading';
import ProductList from '@/components/products/ProductList';
import { useProducts } from '@/hooks/useProducts';
import { ShopLayout } from '@/components/layouts/ShopLayout';

const WomenPage: NextPage = () => {
  const { products, isLoading } = useProducts('/products?gender=women');

  return (
    <ShopLayout>
      <Typography variant='h1' component='h1'>
        Women
      </Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>
        Products for women
      </Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default WomenPage;
