import { SHOP_CONSTANTS } from '@/database/constants';
import db from '@/database/db';
import Product from '@/models/Product';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    let condition = {};

    const url = new URL(req.url);
    const gender = url.searchParams.get('gender') || 'all';

    if (gender !== 'all' && SHOP_CONSTANTS.validGenders.includes(`${gender}`)) {
      condition = { gender };
    }

    await db.connect();
    const products = await Product.find(condition)
      .select('title images price inStock slug -_id')
      .lean();

    await db.disconnect();

    const updatedProducts = products.map((product) => {
      product.images = product.images.map((image: string | string[]) => {
        return image.includes('http') ? image : `${process.env.HOST_NAME}products/${image}`;
      });

      return product;
    });

    return NextResponse.json(updatedProducts, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Bad request' }, { status: 400 });
  }
};
