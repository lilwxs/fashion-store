import db from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  try {
    await db.connectDb();
    await db.disconnectDb();

    return NextResponse.json({ name: 'John Doe' }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'User Not found' }, { status: 204 });
  }
};
