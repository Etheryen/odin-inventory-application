import { prisma } from '@/app/util/prisma';
import { redirect } from 'next/dist/server/api-utils';
import { NextResponse } from 'next/server';

export async function GET() {
  const categories = await prisma.category.findMany();
  return NextResponse.json(categories);
}

interface CategoryPostRequestType {
  name: string;
  description: string;
}

export async function POST(request: Request) {
  const body: CategoryPostRequestType = await request.json();
  const newCategory = await prisma.category.create({ data: body });
  return redirect;
}
