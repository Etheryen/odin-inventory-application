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
