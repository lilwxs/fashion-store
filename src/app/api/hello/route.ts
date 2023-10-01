import db from '@/database/db';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  try {
    await db.connect();
    await db.disconnect();

    return NextResponse.json({ name: 'John Doe' }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'User Not found' }, { status: 204 });
  }
};
