import { prisma } from '@/app/util/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const items = await prisma.item.findMany();
  return NextResponse.json(items);
}

interface ItemPostRequestType {
  name: string;
  description: string;
  price: number;
  categoryId: string;
}

export async function POST(request: Request) {
  const body: ItemPostRequestType = await request.json();
  const newItem = await prisma.item.create({
    data: body,
    select: { id: true },
  });
  return NextResponse.json({ id: newItem.id });
}
