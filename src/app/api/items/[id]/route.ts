import { prisma } from '@/app/util/prisma';
import { ApiError } from 'next/dist/server/api-utils';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const item = await prisma.item.findUnique({
    where: { id: params.id },
  });

  if (!item) {
    throw new ApiError(404, 'Item not found');
  }

  return NextResponse.json(item);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await prisma.item.delete({ where: { id: params.id } });

  return NextResponse.json({ message: 'deleted successfully' });
}
