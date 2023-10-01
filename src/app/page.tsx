'use client';
import { Typography } from '@mui/material';
import { ShopLayout } from '@/components/layouts/ShopLayout';
import { NextPage } from 'next';
import { useProducts } from '@/hooks/useProducts';
import { FullScreenLoading } from '@/components/ui/FullScreenLoading';
import ProductList from '@/components/products/ProductList';

const HomePage: NextPage = () => {
  const { products, isLoading } = useProducts('/products');

  return (
    <>
      <ShopLayout>
        <Typography variant='h1' component='h1'>
          Store
        </Typography>
        <Typography variant='h2' sx={{ mb: 1 }}>
          All products
        </Typography>

        {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
      </ShopLayout>
    </>
  );
};
export default HomePage;
