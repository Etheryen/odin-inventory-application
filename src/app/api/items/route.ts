import { prisma } from '@/app/util/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const items = await prisma.item.findMany();
  return NextResponse.json(items);
}
