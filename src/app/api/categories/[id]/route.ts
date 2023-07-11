import { prisma } from '@/app/util/prisma';
import { revalidatePath } from 'next/cache';
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

interface CategoryPutRequestType {
  name: string;
  description: string;
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body: CategoryPutRequestType = await request.json();

  const updatedCategory = await prisma.category.update({
    where: {
      id: params.id,
    },
    data: body,
    select: { id: true },
  });

  revalidatePath('/categories/[id]');
  revalidatePath('/');
  return NextResponse.json({ id: updatedCategory.id });
}
