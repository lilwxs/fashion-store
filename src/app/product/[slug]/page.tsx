import { Metadata, NextPage } from 'next';
import { ShopLayout } from '@/components/layouts/ShopLayout';
import dbProducts from '@/database/dbProducts';
import Product from '@/components/product/Product';

type Props = {
  params: {
    slug: string;
  };
};

export const generateMetadata = async ({ params: { slug } }: Props): Promise<Metadata> => {
  return {
    title: `Next App | Shop - ${slug}`,
  };
};

const ProductPage: NextPage<Props> = async ({ params: { slug } }) => {
  const product = await dbProducts.getProductBySlug(slug);

  return (
    <>
      {product && (
        <ShopLayout>
          <Product product={product} />
        </ShopLayout>
      )}
    </>
  );
};
export default ProductPage;
