import db from '@/database/db';
import seedDatabase from '@/database/seed-data';
import Order from '@/models/Order';
import Product from '@/models/Product';
import User from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';

type Data = { message: string };

export const GET = async (req: NextRequest, res: NextResponse<Data>) => {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ message: 'You do not have access to this API' }, { status: 401 });
  }

  await db.connect();

  // await User.deleteMany();
  await User.insertMany(seedDatabase.initialData.users);

  await Product.deleteMany();
  await Product.insertMany(seedDatabase.initialData.products);

  await Order.deleteMany();

  await db.disconnect();

  return NextResponse.json({ message: 'The process was carried out correctly' }, { status: 200 });
};
