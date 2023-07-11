import { prisma } from '@/app/util/prisma';
import { revalidatePath } from 'next/cache';
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

interface ItemPutRequestType {
  name: string;
  description: string;
  price: number;
  categoryId: string;
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body: ItemPutRequestType = await request.json();

  const updatedItem = await prisma.item.update({
    where: {
      id: params.id,
    },
    data: body,
    select: { id: true },
  });

  revalidatePath(`/items/[id]`);
  revalidatePath(`/items`);
  revalidatePath(`/categories/[id]/items`);
  return NextResponse.json({ id: updatedItem.id });
}
