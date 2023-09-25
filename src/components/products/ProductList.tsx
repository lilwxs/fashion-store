import { FC } from 'react';
import { Grid } from '@mui/material';
import { IProduct } from '@/interfaces/products';
import ProductCard from '@/components/products/ProductCard';

interface Props {
  products: IProduct[];
}

const ProductList: FC<Props> = ({ products }) => {
  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </Grid>
  );
};

export default ProductList;
