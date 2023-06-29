import { prisma } from '@/app/util/prisma';
import { ApiError } from 'next/dist/server/api-utils';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log(params);
  const category = await prisma.category.findUnique({
    where: { id: params.id },
  });

  if (!category) {
    throw new ApiError(404, 'Category not found');
  }

  return NextResponse.json(category);
}
