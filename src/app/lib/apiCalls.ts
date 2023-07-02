import { Category } from '@prisma/client';
import { withAxios } from '../util/axios';

export async function getAllCategories(): Promise<Category[]> {
  return (await withAxios.get('/api/categories')).data;
}
