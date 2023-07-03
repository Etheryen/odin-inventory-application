import { prisma } from '@/app/util/prisma';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const categories = await prisma.category.findMany();
  return NextResponse.json(categories);
}

interface CategoryPostRequestType {
  name: string;
  description: string;
}

export async function POST(request: Request) {
  const body: CategoryPostRequestType = await request.json();
  const newCategory = await prisma.category.create({
    data: body,
    select: { id: true },
  });
  revalidatePath('/categories');
  return NextResponse.json({ id: newCategory.id });
}
