import { prisma } from '@/app/util/prisma';
import { ApiError } from 'next/dist/server/api-utils';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const category = await prisma.category.findUnique({
    where: { id: params.id },
  });

  if (!category) {
    throw new ApiError(404, 'Category not found');
  }

  return NextResponse.json(category);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const categoryItems = await prisma.item.findMany({
    where: { categoryId: params.id },
  });

  if (categoryItems.length > 0) {
    throw new ApiError(403, 'Category contains items');
  }

  await prisma.category.delete({ where: { id: params.id } });

  return NextResponse.json({ message: 'deleted successfully' });
}
