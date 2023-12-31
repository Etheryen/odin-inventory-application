import { prisma } from '@/app/util/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const items = await prisma.item.findMany({
    where: { categoryId: params.id },
  });

  return NextResponse.json(items);
}
