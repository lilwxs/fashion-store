import { SHOP_CONSTANTS } from '@/database/constants';
import db from '@/database/db';
import Product from '@/models/Product';
import { NextRequest, NextResponse } from 'next/server';

interface Params {
  params: {
    slug: string;
  };
}

export const GET = async (req: NextRequest, { params: { slug } }: Params) => {
  try {
    await db.connect();

    const product = await Product.findOne({ slug }).lean();
    await db.disconnect();

    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    product.images = product.images.map((image) => {
      return image.includes('http') ? image : `${process.env.HOST_NAME}products/${image}`;
    });

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Bad request' }, { status: 400 });
  }
};
